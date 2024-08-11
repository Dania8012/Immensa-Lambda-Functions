export interface ChatContextInterface {
  name: string // COHORT, PROJECT, etc..
  id: string // id of document
}

export interface ChatParticipantDto {
  userId: string
  firstName: string
  lastName: string
  photo: string
  lastReadTime: number
}

export interface GenerateChatThreadDto {
  threadId: string
  participants: ChatParticipantDto[]
  context: ChatContextInterface
  lastMessage: ChatMessageDto
  newMessage: ChatMessageDto
}

export interface GenerateGroupChatDto {
  threadId: string
  participants: ChatParticipantDto[]
  context: ChatContextInterface
}

export interface NewGroupChatMemberDto {
  participant: ChatParticipantDto
  context: ChatContextInterface
}

export interface ChatFile {
  name: string
  url: string
}

export interface ChatMessageDto {
  text?: string
  files?: ChatFile[]
  author: string
  createdAt: number
}

export interface ChatThreadDto {
  id: string
  isGroup: boolean
  participants: ChatParticipantDto[]
  participantIds: string[]
  messages: ChatMessageDto[]
  lastMessage?: ChatMessageDto
  context: ChatContextInterface
}

export interface CurrentThreadDto {
  threadId: string
  participant: ChatParticipantDto
  isNew: boolean
}

export interface PreselectThreadDto {
  threadId?: string
  participant: ChatParticipantDto
}
