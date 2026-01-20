import { UserDatasource } from "../../../domain/datasources"
import { CreateUserDto, SearchUserDto } from "../../../domain/dtos/user.dto"
import { User } from "../../../domain/entities"
import { UserRepository } from "../../../domain/repositories"

export class UserRepositoryImpl implements UserRepository {

  constructor(
    private readonly datasource: UserDatasource
  ) {}

  async register(data: CreateUserDto): Promise<User> {
    return await this.datasource.create(data)
  }

  async getById(id: number): Promise<User | null> {
    return await this.datasource.findById(id)
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.datasource.findByEmail(email)
  }

  async search(data: SearchUserDto): Promise<User[]> {
    return await this.datasource.searchByUsername(data)
  }
}
