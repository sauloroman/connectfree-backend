export interface SocketAuthDto {
  token: string
}

export interface TypingDto {
  conversationId: number
  userId: number
  isTyping: boolean
}

export interface MessageReadDto {
  conversationId: number
  userId: number
  messageId: number
}
