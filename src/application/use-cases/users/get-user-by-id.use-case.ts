import { User } from "../../../domain/entities";
import { UserRepository } from "../../../domain/repositories";

export class GetUserByIdUseCase {

    constructor(private readonly userRepository: UserRepository ){}

    public async execute( userId: number ): Promise<User> {
        const user = await this.userRepository.getById( userId )

        if ( !user ) {
            throw new Error('Usuario no encontrado')
        }

        return user
    }

}