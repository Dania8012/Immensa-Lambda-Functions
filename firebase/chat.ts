import { db } from 'src/config/firebase'
import nanoid from 'nanoid'
import { random, toPlainObject } from 'lodash'
import {
  ChatContextInterface,
  ChatParticipantDto,
  ChatThreadDto,
  GenerateChatThreadDto,
  GenerateGroupChatDto,
  NewGroupChatMemberDto
} from './dto'
import {
  arrayUnion,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  Query,
  query,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore'
import moment from 'moment'
import { chatThreadResponseDtoConverter } from './converters'
import { captureError } from '@qureos/lib'

export const collections = {
  CHAT: 'chat',
  MESSAGES: 'messages',
  PARTICIPANTS: 'participants'
}

export const fields = {
  PARTICIPANT_IDS: 'participantIds',
  CONTEXT: 'context',
  LAST_MESSAGE: 'lastMessage',
  AUTHOR: 'author',
  CREATED_AT: 'createdAt',
  FILES: 'files',
  TEXT: 'text'
}

export const generateRandomId = (): string =>
  `${nanoid()}${random(100000, 999999)}`

export const getChatDocumentRef = (threadId: string): DocumentReference =>
  doc(db, collections.CHAT, threadId)

export const getMessagesCollectionRef = (
  threadId: string
): CollectionReference =>
  collection(db, `${collections.CHAT}/${threadId}/${collections.MESSAGES}`)

export const getParticipantsCollectionRef = (
  threadId: string
): CollectionReference =>
  collection(db, `${collections.CHAT}/${threadId}/${collections.PARTICIPANTS}`)

export const getParticipantDocumentRef = (
  threadId: string,
  userId: string
): DocumentReference => doc(getParticipantsCollectionRef(threadId), userId)

export const getContextChatsRef = (
  userId: string,
  context: ChatContextInterface
): Query<DocumentData> => {
  const q = query(
    collection(db, collections.CHAT),
    where('context.id', '==', context.id),
    where('context.name', '==', context.name),
    where(fields.PARTICIPANT_IDS, 'array-contains', userId)
  )
  return q
}

export const getContextGroupChatReference = async (
  context: ChatContextInterface
): Promise<DocumentReference> => {
  const q = query(
    collection(db, collections.CHAT),
    where('context.id', '==', context.id),
    where('context.name', '==', context.name),
    where('isGroup', '==', true)
  )

  const querySnapshot = await getDocs(
    q.withConverter(chatThreadResponseDtoConverter)
  )

  if (querySnapshot.docs.length > 0) {
    const document = querySnapshot.docs.pop()
    const dto = toPlainObject(document.data()) as ChatThreadDto
    return doc(db, collections.CHAT, dto.id)
  }
}

export const updateLastRead = async (
  threadId: string,
  userId: string
): Promise<void> => {
  const docRef = doc(
    db,
    `${collections.CHAT}/${threadId}/${collections.PARTICIPANTS}`,
    userId
  )
  const utcUnixTimestamp = moment.utc().unix()
  // Update the timestamp field with the value from the server
  await updateDoc(docRef, {
    lastReadTime: utcUnixTimestamp
  })
}

export const generateThread = async (
  dto: GenerateChatThreadDto
): Promise<void> => {
  try {
    dto.participants = dto.participants.map(i => sanitizeParticipantDto(i))
    const { threadId, context, participants, lastMessage, newMessage } = dto
    // const chatId = generateRandomId()
    const participantsCollectionRef = collection(
      doc(collection(db, collections.CHAT), threadId),
      collections.PARTICIPANTS
    )

    const messagesCollectionRef = collection(
      doc(collection(db, collections.CHAT), threadId),
      collections.MESSAGES
    )

    // Get a new write batch
    const batch = writeBatch(db)

    batch
      .set(doc(collection(db, collections.CHAT), threadId), {
        context: context,
        participantIds: participants.map(x => x.userId),
        lastMessage: lastMessage,
        isGroup: false
      })
      .set(doc(participantsCollectionRef, participants[0].userId), {
        ...participants[0]
      })
      .set(doc(participantsCollectionRef, participants[1].userId), {
        ...participants[1]
      })
      .set(doc(messagesCollectionRef, generateRandomId()), {
        ...newMessage
      })
    return await batch.commit()
  } catch (e) {
    console.log(e)
  }
}

export const generateGroupChatThread = async (
  dto: GenerateGroupChatDto
): Promise<void> => {
  try {
    dto.participants = dto.participants.map(i => sanitizeParticipantDto(i))
    const { threadId, context, participants } = dto
    const chatThreadDto = await getContextGroupChatReference(context)

    if (chatThreadDto) {
      // chat already exists!
      return
    }

    const participantsCollectionRef = collection(
      doc(collection(db, collections.CHAT), threadId),
      collections.PARTICIPANTS
    )

    // Get a new write batch
    const batch = writeBatch(db)

    batch
      .set(doc(collection(db, collections.CHAT), threadId), {
        context: context,
        isGroup: true,
        participantIds: participants.map(x => x.userId)
      })
      .set(doc(participantsCollectionRef, participants[0].userId), {
        ...participants[0]
      })

    return await batch.commit()
  } catch (error) {
    captureError({
      error,
      msg: `FIREBASE_ERROR...Unable to create group chat for cohort: ${JSON.stringify(
        dto
      )}`,
      severity: 'High'
    })
  }
}

export const addParticipantToGroupChat = async (
  dto: NewGroupChatMemberDto
): Promise<void> => {
  try {
    dto.participant = sanitizeParticipantDto(dto.participant)
    const { context, participant } = dto
    const chatThreadDto = await getContextGroupChatReference(context)

    if (!chatThreadDto) {
      // group chat must exist at this point, this should never be true
      return
    }

    const threadRef = doc(collection(db, collections.CHAT), chatThreadDto.id)
    const participantsCollectionRef = collection(
      threadRef,
      collections.PARTICIPANTS
    )

    const batch = writeBatch(db)

    batch.update(threadRef, {
      participantIds: arrayUnion(participant.userId)
    })
    batch.set(doc(participantsCollectionRef, participant.userId), participant)

    return await batch.commit()
  } catch (error) {
    captureError({
      error,
      msg: `FIREBASE_ERROR...Unable to add apprentice to group chat for cohort: ${JSON.stringify(
        dto
      )}`,
      severity: 'High'
    })
  }
}

const sanitizeParticipantDto = (dto: ChatParticipantDto) => {
  dto = {
    ...dto,
    firstName: dto.firstName ?? '',
    lastName: dto.lastName ?? '',
    photo: dto.photo ?? ''
  }
  return dto
}
