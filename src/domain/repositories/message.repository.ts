import { DeleteMessageDto, EditMessageDto, MessageHistoryDto, SendMessageDto } from '../dtos/message.dto'
import { Message } from '../entities/message.entity'

export abstract class MessageRepository {
  abstract send( data: SendMessageDto ): Promise<Message>
  abstract getHistory( data: MessageHistoryDto): Promise<Message[]>
  abstract getById( messageId: number ): Promise<Message | null>
  abstract edit( data: EditMessageDto ): Promise<Message>
  abstract remove( data: DeleteMessageDto ): Promise<void>
}
