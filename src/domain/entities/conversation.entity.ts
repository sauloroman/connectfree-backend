export class Conversation {

  constructor(
    private readonly _id: number,
    private readonly _createdAt: Date = new Date()
  ) {}

  get id(): number {
    if (this._id <= 0) {
      throw new Error('Conversation ID is invalid')
    }
    return this._id
  }

  get createdAt(): Date {
    return this._createdAt
  }
}
