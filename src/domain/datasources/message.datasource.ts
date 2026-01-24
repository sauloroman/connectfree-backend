import { SendMessageDto, MessageHistoryDto, EditMessageDto, DeleteMessageDto } from '../dtos/message.dto'
import { Message } from '../entities'

export abstract class MessageDatasource {
  abstract save( data: SendMessageDto ): Promise<Message>
  abstract findByConversation( data: MessageHistoryDto ): Promise<Message[]>
  abstract findById(messageId: number): Promise<Message | null>
  abstract update( data: EditMessageDto ): Promise<Message>
  abstract delete( data: DeleteMessageDto ): Promise<void>
}
