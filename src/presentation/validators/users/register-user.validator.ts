import { RegExp } from "../../../config/utils";
import { CreateUserDto } from "../../../domain/dtos/user.dto";

export class RegisterUserValidator {

    private static readonly USERNAME_MIN_LENGTH = 3;
    private static readonly USERNAME_MAX_LENGTH = 50;

    public static validate(data: any): [CreateUserDto?, string?] {
        if (!data.username || data.username.trim().length === 0) {
        return [undefined, "El nombre de usuario es obligatorio"];
        }

        if (data.username.length < RegisterUserValidator.USERNAME_MIN_LENGTH ) {
        return [undefined, "El nombre de usuario debe contener como mínimo 3 caracteres"];
        }

        if (data.username.length > RegisterUserValidator.USERNAME_MAX_LENGTH) {
        return [undefined, "El nombre de usuario no debe exceder un máximo de 50 caracteres"];
        }

        if (!data.email || data.email.trim().length === 0) {
        return [undefined, "El correo electrónico es obligatorio"];
        }

        if (!RegExp.EMAIL_REGEX.test(data.email)) {  
        return [undefined, "El correo no es válido"];
        }

        if (!data.password || data.password.trim().length === 0) {
        return [undefined, "La contraseña es obligatoria"];
        }

        if (!RegExp.PASSWORD_REGEX.test(data.password)) {
        return [
            undefined,
            "La contraseña debe contener:\n" +
            "1. Mínimo 8 caracteres.\n" +
            "2. Al menos una letra mayúscula.\n" +
            "3. Al menos un número.\n" +
            "4. Al menos 1 carácter especial."
        ];
        }

        return [{
            username: data.username,
            email: data.email,
            password: data.password
        }];
    }
}