import { Conversation } from "../../../domain/entities";
import { ConversationRepository } from "../../../domain/repositories";

export class GetConversationByIdUseCase {

    constructor( private readonly conversationRepository: ConversationRepository ){}

    public async execute( conversationId: number, userId: number ): Promise<Conversation> {
        if ( conversationId < 0 )  throw new Error('ID de conversación no válido')
        
        const conversation = await this.conversationRepository.getById( conversationId )
        if ( !conversation ) throw new Error('Conversación no encontrada')

        const isParticipant = await this.conversationRepository.isUserInConversation(conversationId, userId)
        if ( !isParticipant ) throw new Error('No tienes acceso a esta conversación')

        return conversation
    }

}