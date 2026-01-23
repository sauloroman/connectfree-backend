import { ConversationBetweenUsersDto } from "../../../domain/dtos/conversation.dto";

export class CreateConversationValidator {

    public static validate(body: any): [ConversationBetweenUsersDto?, string?] {

        const { contactUserId } = body

        if ( !contactUserId ) {
            return [undefined, 'El ID del contacto es requerido']
        }

        if ( typeof contactUserId !== 'number' || contactUserId <= 0 ) {
            return [undefined, 'El ID del contacto debe ser un número válido']
        }

        return [{
            userAId: 0,
            userBId: contactUserId
        }]

    }

}