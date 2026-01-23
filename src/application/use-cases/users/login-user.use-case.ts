import { HashAdapter } from "../../../config/plugin/crypt.plugin";
import { JwtAdapter } from "../../../config/plugin/jwt.plugin";
import { UserRepository } from "../../../domain/repositories";
import { LoginUserInput, LoginUserResult } from "../../interface/login.interface";

export class LoginUserUseCase {

    constructor(private readonly userRepository: UserRepository ){}

    public async execute( data: LoginUserInput ): Promise<LoginUserResult>  {

        const user = await this.userRepository.getByEmail(data.email)
        if ( !user ) throw new Error('Credenciales Invalidas')

        const isCorrectPassword = HashAdapter.compare( data.password, user.getPassword )
        if ( !isCorrectPassword ) throw new Error('Credenciales Invalidas')

        const token = await JwtAdapter.generateJWT({ id: user.getId }) as string

        return {
            token,
            user
        }
    }   

}