export class User {

  constructor(
    private readonly _id: number,
    private _username: string,
    private _email: string,
    private _password: string,
    private readonly _createdAt: Date = new Date()
  ) {
    this.username = _username
    this.email = _email
    this.password = _password
  }

  get id(): number {
    if (!this._id || this._id <= 0) {
      throw new Error('User ID is invalid')
    }
    return this._id
  }

  get username(): string {
    if (!this._username || this._username.length < 3) {
      throw new Error('Username must have at least 3 characters')
    }
    return this._username
  }

  get email(): string {
    if (!this._email.includes('@')) {
      throw new Error('Invalid email format')
    }
    return this._email
  }

  get password(): string {
    if (this._password.length < 6) {
      throw new Error('Password must have at least 6 characters')
    }
    return this._password
  }

  get createdAt(): Date {
    return this._createdAt
  }

  set username(value: string) {
    if (!value || value.length < 3) {
      throw new Error('Username must have at least 3 characters')
    }
    this._username = value
  }

  set email(value: string) {
    if (!value.includes('@')) {
      throw new Error('Invalid email format')
    }
    this._email = value
  }

  set password(value: string) {
    if (value.length < 6) {
      throw new Error('Password must have at least 6 characters')
    }
    this._password = value
  }
}
