import { MessageHistoryDto } from "../../../domain/dtos/message.dto";
import { Message } from "../../../domain/entities";
import { ConversationRepository, MessageRepository } from "../../../domain/repositories";

export class GetMessageHistoryUseCase {

    constructor(
        private readonly messageRepository: MessageRepository,
        private readonly conversationRepository: ConversationRepository
    ){}

    public async execute( data: MessageHistoryDto, userId: number ): Promise<Message[]> {
        const { conversationId, limit, offset } = data

        const conversation = await this.conversationRepository.getById( conversationId )
        if ( !conversation ) {
            throw new Error('Conversación no encontrada')
        }
        
        const isParticipant = await this.conversationRepository.isUserInConversation(conversationId, userId)
        if ( !isParticipant ) {
            throw new Error('No tienes acceso a esta conversación')
        }

        return await this.messageRepository.getHistory({
            conversationId,
            limit: limit ?? 50,
            offset: offset ?? 0
        })

    }

}