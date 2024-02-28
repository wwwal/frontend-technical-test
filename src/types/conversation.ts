export interface Conversation {
  id: number
  recipientId: number
  recipientNickname: string
  recipientOnline: boolean
  lastMessageTimestamp: number,
}