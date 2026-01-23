export interface CreateConversationDto {
    participants: number[]
}

export interface ConversationBetweenUsersDto {
    userAId: number
    userBId: number
}

export interface AddParticipantDto {
  conversationId: number
  userId: number
}

export interface GetConversationParticipantsDto {
  conversationId: number
}