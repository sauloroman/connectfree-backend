export interface SendMessageDto {
    conversationId: number,
    senderId: number,
    content: string
}

export interface MessageHistoryDto {
    conversationId: number,
    limit?: number,
    offset?: number
}