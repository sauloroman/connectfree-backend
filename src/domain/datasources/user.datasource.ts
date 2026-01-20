import { CreateUserDto, SearchUserDto } from "../dtos/user.dto";
import { User } from "../entities";

export abstract class UserDatasource {
    abstract create( data: CreateUserDto ): Promise<User>
    abstract findById( id: number ): Promise<User | null>
    abstract findByEmail( email: string ): Promise<User | null>
    abstract searchByUsername( data: SearchUserDto ): Promise<User[]>
}