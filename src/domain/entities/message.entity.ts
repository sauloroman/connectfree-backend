export class Message {

  constructor(
    private readonly _id: number,
    private readonly _conversationId: number,
    private readonly _senderId: number,
    private _content: string,
    private readonly _createdAt: Date = new Date()
  ) {
    this.content = _content
  }

  get id(): number {
    if (this._id <= 0) {
      throw new Error('Message ID is invalid')
    }
    return this._id
  }

  get conversationId(): number {
    if (this._conversationId <= 0) {
      throw new Error('Conversation ID is invalid')
    }
    return this._conversationId
  }

  get senderId(): number {
    if (this._senderId <= 0) {
      throw new Error('Sender ID is invalid')
    }
    return this._senderId
  }

  get content(): string {
    if (!this._content || this._content.trim().length === 0) {
      throw new Error('Message content cannot be empty')
    }
    return this._content
  }

  get createdAt(): Date {
    return this._createdAt
  }

  set content(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Message content cannot be empty')
    }
    if (value.length > 1000) {
      throw new Error('Message is too long')
    }
    this._content = value.trim()
  }
}
