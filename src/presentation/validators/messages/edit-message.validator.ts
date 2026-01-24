import { EditMessageDto } from "../../../domain/dtos/message.dto";

export class EditMessageValidator {

    private static readonly MESSAGE_LENGTH = 1000

    public static validate( body: any ): [Pick<EditMessageDto, 'newContent'>?, string? ] {

        const { newContent } = body

        if ( !newContent ) {
            throw new Error('El nuevo contenido es requerido.')
        }
        
        if ( typeof newContent !== 'string' ) {
            throw new Error('El contenido deber ser texto.')
        }

        if ( newContent.trim().length === 0 ) {
            return [undefined, 'El mensaje no puede estar vacío']
        }

        if ( newContent.length > EditMessageValidator.MESSAGE_LENGTH ) {
            return [undefined, 'El mensaje es demasiado largo (máximo 1000 caracteres)']
        }

        return [{
            newContent: newContent.trim()
        }]

    }

}