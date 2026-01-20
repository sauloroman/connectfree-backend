import { SearchUserDto } from "../../../domain/dtos/user.dto";
import { User } from "../../../domain/entities";
import { UserRepository } from "../../../domain/repositories";

export class SearchUsersUseCase {

    constructor(private readonly userRepository: UserRepository){}

    public async execute( data: SearchUserDto ): Promise<User[]> {
        return await this.userRepository.search(data)
    }

}