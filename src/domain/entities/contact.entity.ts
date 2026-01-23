export class Contact {

  constructor(
    private readonly id: number,
    private readonly userId: number,
    private readonly contactUserId: number,
    private readonly createdAt: Date = new Date(),
    private readonly isActive: boolean,
    private readonly deletedAt?: Date | null
  ) {
    if (userId === contactUserId) {
      throw new Error('User cannot add himself as contact')
    }
  }

  get getId(): number {
    if (this.id <= 0) {
      throw new Error('Contact ID is invalid')
    }
    return this.id
  }

  get getUserId(): number {
    if (this.userId <= 0) {
      throw new Error('User ID is invalid')
    }
    return this.userId
  }

  get getContactUserId(): number {
    if (this.contactUserId <= 0) {
      throw new Error('Contact User ID is invalid')
    }
    return this.contactUserId
  }

  get getCreatedAt(): Date {
    return this.createdAt
  }

  get getIsActive(): boolean {
    return this.isActive
  }

  get getDeletedAt(): Date | null {
    return this.deletedAt ?? null
  }

}
