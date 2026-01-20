import { UserDatasource } from "../../../domain/datasources";
import { CreateUserDto, SearchUserDto } from "../../../domain/dtos/user.dto";
import { User } from "../../../domain/entities";

export class UserDatasourcePostgres implements UserDatasource {
    
    async create(data: CreateUserDto): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async searchByUsername(data: SearchUserDto): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    
}