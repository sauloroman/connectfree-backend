import { ConversationBetweenUsersDto } from "../../../domain/dtos/conversation.dto";
import { Conversation } from "../../../domain/entities";
import { ContactRepository, ConversationRepository } from "../../../domain/repositories";

export class CreateOrGetConversationUseCase {

    constructor(
        private readonly conversationRepository: ConversationRepository,
        private readonly contactRepository: ContactRepository
    ){}

    public async execute( data: ConversationBetweenUsersDto ): Promise<Conversation> {
        const { userAId, userBId } = data
        if ( userAId === userBId ) {
            throw new Error('No puedes crear una conversación contigo mismo.')
        }
        
        const areContacts = await this.contactRepository.exists(userAId, userBId)
        if ( !areContacts ) {
            throw new Error('Solo puedes chatear con tus contactos.')
        }

        return await this.conversationRepository.createOrGet(data)
    }

}