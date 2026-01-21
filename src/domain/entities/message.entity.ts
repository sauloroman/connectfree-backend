export class Message {

  constructor(
    private readonly id: number,
    private readonly conversationId: number,
    private readonly senderId: number,
    private content: string,
    private readonly createdAt: Date = new Date()
  ) {
    this.content = content
  }

  get getId(): number {
    if (this.id <= 0) {
      throw new Error('Message ID is invalid')
    }
    return this.id
  }

  get getConversationId(): number {
    if (this.conversationId <= 0) {
      throw new Error('Conversation ID is invalid')
    }
    return this.conversationId
  }

  get getSenderId(): number {
    if (this.senderId <= 0) {
      throw new Error('Sender ID is invalid')
    }
    return this.senderId
  }

  get getContent(): string {
    if (!this.content || this.content.trim().length === 0) {
      throw new Error('Message content cannot be empty')
    }
    return this.content
  }

  get getCreatedAt(): Date {
    return this.createdAt
  }

  set setContent(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Message content cannot be empty')
    }
    if (value.length > 1000) {
      throw new Error('Message is too long')
    }
    this.content = value.trim()
  }
}
