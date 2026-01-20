import { MessageHistoryDto } from '../dtos/message.dto'
import { Message } from '../entities/message.entity'

export abstract class MessageRepository {
  abstract send( message: Message ): Promise<Message>
  abstract getHistory( data: MessageHistoryDto): Promise<Message[]>
}
