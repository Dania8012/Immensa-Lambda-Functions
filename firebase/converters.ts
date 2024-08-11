// Firestore data converter

export const chatThreadResponseDtoConverter = {
  toFirestore: data => data,
  fromFirestore: snap => {
    //console.log(`Snap: ${JSON.stringify(snap)}`)
    return {
      id: snap.id,
      ...snap.data()
    }
  }
}
