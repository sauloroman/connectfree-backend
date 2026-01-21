import { RegExp } from "../../config/utils"

export class User {

  constructor(
    private readonly id: number,
    private username: string,
    private email: string,
    private password: string,
    private readonly createdAt: Date = new Date()
  ) {
    this.username = username
    this.email = email
    this.password = password
  }

  get getId(): number {
    if (!this.id || this.id <= 0) {
      throw new Error('User ID is invalid')
    }
    return this.id
  }

  get getUsername(): string {
    if (!this.username || this.username.length < 3) {
      throw new Error('Username must have at least 3 characters')
    }
    return this.username
  }

  get getEmail(): string {
    if (!RegExp.EMAIL_REGEX.test(this.email)) {
      throw new Error('Invalid email format')
    }
    return this.email
  }

  get getPassword(): string {
    if (this.password.length < 6) {
      throw new Error('Password must have at least 6 characters')
    }
    return this.password
  }

  get getCreatedAt(): Date {
    return this.createdAt
  }

  set getUsername(value: string) {
    if (!value || value.length < 3) {
      throw new Error('Username must have at least 3 characters')
    }
    this.username = value
  }

  set getEmail(value: string) {
    if (!value.includes('@')) {
      throw new Error('Invalid email format')
    }
    this.email = value
  }

  set getPassword(value: string) {
    if (value.length < 6) {
      throw new Error('Password must have at least 6 characters')
    }
    this.password = value
  }
}
