import { CreateUserDto, SearchUserDto } from "../dtos/user.dto";
import { User } from "../entities";

export abstract class UserRepository {
    abstract register( data: CreateUserDto ): Promise<User>
    abstract getById( id: number ): Promise<User | null>
    abstract getByEmail( email: string ): Promise<User | null>
    abstract search( data: SearchUserDto ): Promise<User[]>
}