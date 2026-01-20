import { MessageDatasource } from "../../../domain/datasources";
import { SendMessageDto, MessageHistoryDto } from "../../../domain/dtos/message.dto";
import { Message } from "../../../domain/entities";

export class MessageDatasourcePostgres implements MessageDatasource {
    
    async save(data: SendMessageDto): Promise<Message> {
        throw new Error("Method not implemented.");
    }
    
    async findByConversation(data: MessageHistoryDto): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }

}