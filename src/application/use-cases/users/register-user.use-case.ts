import { HashAdapter } from "../../../config/plugin/crypt.plugin";
import { CreateUserDto } from "../../../domain/dtos/user.dto";
import { User } from "../../../domain/entities";
import { UserRepository } from "../../../domain/repositories";

export class RegisterUserUseCase {

    constructor(private readonly userRepository: UserRepository){}

    public async execute( data: CreateUserDto ): Promise<User> {

        const exists = await this.userRepository.getByEmail( data.email )
        if ( exists ) throw new Error('Error al registrar usuario')

        const hashedPassword = HashAdapter.hash(data.password)

        return this.userRepository.register({
            ...data,
            password: hashedPassword
        })

    }

}