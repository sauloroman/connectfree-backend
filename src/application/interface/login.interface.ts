import { User } from "../../domain/entities"

export interface LoginUserInput {
  email: string
  password: string
}

export interface LoginUserResult {
  user: User
  token: string
}