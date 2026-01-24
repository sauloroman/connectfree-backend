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

export interface DeleteMessageDto {
    messageId: number,
    userId: number
}

export interface EditMessageDto {
    messageId: number,
    userId: number,
    newContent: string
}