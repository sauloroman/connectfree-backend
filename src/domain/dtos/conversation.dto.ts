export interface CreateConversationDto {
    participants: number[]
}

export interface ConversationBetweenUsersDto {
    userAId: number
    userBId: number
}
