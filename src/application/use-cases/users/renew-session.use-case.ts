import { JwtAdapter } from "../../../config/plugin";
import { User } from "../../../domain/entities";
import { UserRepository } from "../../../domain/repositories";

export class RenewSessionUseCase {

    constructor(private readonly userRepository: UserRepository){}

    public async execute( token: string ): Promise<User> {
        const payload = await JwtAdapter.validateToken<{ id: number }>( token as string )

        const user = await this.userRepository.getById(payload?.id ?? 0)
        if ( !user ) {
            throw new Error('El token no es válido')
        }

        return user
    }

}