import { ConversationDatasource } from "../../../domain/datasources";
import { CreateConversationDto, ConversationBetweenUsersDto } from "../../../domain/dtos/conversation.dto";
import { Conversation } from "../../../domain/entities";

export class ConversationDatasourcePostgres implements ConversationDatasource {
    
    async create(data: CreateConversationDto): Promise<Conversation> {
        throw new Error("Method not implemented.");
    }
    
    async findById(conversationId: number): Promise<Conversation | null> {
        throw new Error("Method not implemented.");
    }
    
    async findConversationBetweenUsers(data: ConversationBetweenUsersDto): Promise<Conversation | null> {
        throw new Error("Method not implemented.");
    }
    
    async getUserConversations(userId: number): Promise<Conversation[]> {
        throw new Error("Method not implemented.");
    }

}