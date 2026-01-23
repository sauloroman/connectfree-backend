import { MessageRepository } from "../../../domain/repositories";
import { MessageHistoryDto } from "../../../domain/dtos/message.dto";
import { Message } from "../../../domain/entities";

export class GetConversationMessagesUseCase {

  constructor( private readonly messageRepository: MessageRepository ) {}

  async execute( data: MessageHistoryDto ): Promise<Message[]> {
    return this.messageRepository.getHistory(data);
  }
}
