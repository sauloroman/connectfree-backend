import { MessageDatasource } from "../../../domain/datasources"
import { MessageHistoryDto, SendMessageDto } from "../../../domain/dtos/message.dto"
import { Message } from "../../../domain/entities"
import { MessageRepository } from "../../../domain/repositories"

export class MessageRepositoryImpl implements MessageRepository {

  constructor(
    private readonly datasource: MessageDatasource
  ) {}

  async send(data: SendMessageDto): Promise<Message> {
    return await this.datasource.save(data)
  }

  async getHistory(data: MessageHistoryDto): Promise<Message[]> {
    return await this.datasource.findByConversation(data)
  }
}
