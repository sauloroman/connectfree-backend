export class Contact {

  constructor(
    private readonly _id: number,
    private readonly _userId: number,
    private readonly _contactUserId: number,
    private readonly _createdAt: Date = new Date()
  ) {
    if (_userId === _contactUserId) {
      throw new Error('User cannot add himself as contact')
    }
  }

  get id(): number {
    if (this._id <= 0) {
      throw new Error('Contact ID is invalid')
    }
    return this._id
  }

  get userId(): number {
    if (this._userId <= 0) {
      throw new Error('User ID is invalid')
    }
    return this._userId
  }

  get contactUserId(): number {
    if (this._contactUserId <= 0) {
      throw new Error('Contact User ID is invalid')
    }
    return this._contactUserId
  }

  get createdAt(): Date {
    return this._createdAt
  }
}
