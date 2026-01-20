import { LoginUserInput } from "../../../application/interface/login.interface";
import { RegExp } from "../../../config/utils";

export class LoginUserValidator {

    public static validate( data: any ): [LoginUserInput?, string?] {

        if ( !data.email || data.email.trim().length === 0 ) {
            return [undefined, 'El email es obligatorio']
        }
        
        if ( !RegExp.EMAIL_REGEX.test(data.email) ) {
            return [ undefined, 'El email no es válido']
        }

        if ( !data.password || data.password.trim().length === 0 ) {
            return [undefined, 'La contraseña es obligatoria']
        }

        return [{
            email: data.email,
            password: data.password
        }]
    }

}