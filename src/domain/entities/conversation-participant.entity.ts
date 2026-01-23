export class ConversationParticipant {

  constructor(
    private readonly id: number,
    private readonly conversationId: number,
    private readonly userId: number
  ) {
    if (conversationId === userId) {
      throw new Error('Invalid conversation participant data')
    }
  }

  get getId(): number {
    if (this.id <= 0) {
      throw new Error('ConversationParticipant ID is invalid')
    }
    return this.id
  }

  get getConversationId(): number {
    if (this.conversationId <= 0) {
      throw new Error('Conversation ID is invalid')
    }
    return this.conversationId
  }

  get getUserId(): number {
    if (this.userId <= 0) {
      throw new Error('User ID is invalid')
    }
    return this.userId
  }

}