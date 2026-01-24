import { SendMessageDto } from "../../../domain/dtos/message.dto";

export class SendMessageValidator {

    private static readonly MESSAGE_LENGTH = 1000

    public static validate(body: any): [Pick<SendMessageDto, 'content'>?, string?] {
        const { content } = body

        if ( !content ) {
            return [undefined, 'El contenido del mensaje es requerido']
        }
        
        if ( typeof content !== 'string' ) {
            return [undefined, 'El contenido debe ser texto']
        }
        
        if ( content.trim().length === 0 ) {
            return [undefined, 'El mensaje no puede estar vacío']
        }

        if ( content.length > SendMessageValidator.MESSAGE_LENGTH ) {
            return [undefined, 'El mensaje es demasiado largo (máximo 1000 caracteres)']
        }

        return [{content: content.trim()}, undefined]
    }

}