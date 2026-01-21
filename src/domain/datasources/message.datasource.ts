import { SendMessageDto, MessageHistoryDto } from '../dtos/message.dto'
import { Message } from '../entities'

export abstract class MessageDatasource {
  abstract save( data: SendMessageDto ): Promise<Message>
  abstract findByConversation( data: MessageHistoryDto ): Promise<Message[]>
}
