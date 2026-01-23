import { Conversation } from "../../../domain/entities";
import { ConversationRepository } from "../../../domain/repositories";

export class GetUserConversationsUseCase {

    constructor(private readonly conversationRepository: ConversationRepository){}

    public async execute(userId: number): Promise<Conversation[]> {
        if ( userId < 0 ) throw new Error('ID de usuario inválido')
        return await this.conversationRepository.getByUser(userId)
    } 

}