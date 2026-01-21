export class Conversation {

  constructor(
    private readonly id: number,
    private readonly createdAt: Date = new Date()
  ) {}

  get getId(): number {
    if (this.id <= 0) {
      throw new Error('Conversation ID is invalid')
    }
    return this.id
  }

  get getCreatedAt(): Date {
    return this.createdAt
  }
}
