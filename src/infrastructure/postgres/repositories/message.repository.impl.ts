import { MessageDatasource } from "../../../domain/datasources"
import { DeleteMessageDto, EditMessageDto, MessageHistoryDto, SendMessageDto } from "../../../domain/dtos/message.dto"
import { Message } from "../../../domain/entities"
import { MessageRepository } from "../../../domain/repositories"

export class MessageRepositoryImpl implements MessageRepository {

  constructor(
    private readonly datasource: MessageDatasource
  ) {}
  
  async getById(messageId: number): Promise<Message | null> {
    return await this.datasource.findById(messageId)
  }

  async edit(data: EditMessageDto): Promise<Message> {
    return await this.datasource.update(data)
  }

  async remove(data: DeleteMessageDto): Promise<void> {
    return await this.datasource.delete(data)
  }

  async send(data: SendMessageDto): Promise<Message> {
    return await this.datasource.save(data)
  }

  async getHistory(data: MessageHistoryDto): Promise<Message[]> {
    return await this.datasource.findByConversation(data)
  }
}
