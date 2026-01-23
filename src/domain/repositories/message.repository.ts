import { MessageHistoryDto, SendMessageDto } from '../dtos/message.dto'
import { Message } from '../entities/message.entity'

export abstract class MessageRepository {
  abstract send( data: SendMessageDto ): Promise<Message>
  abstract getHistory( data: MessageHistoryDto): Promise<Message[]>
}
