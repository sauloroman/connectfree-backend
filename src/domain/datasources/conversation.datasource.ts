import { CreateConversationDto, ConversationBetweenUsersDto } from '../dtos/conversation.dto'
import { Conversation } from '../entities/conversation.entity'

export abstract class ConversationDatasource {
  abstract create( data: CreateConversationDto ): Promise<Conversation>
  abstract findById( conversationId: number ): Promise<Conversation | null>
  abstract findConversationBetweenUsers( data: ConversationBetweenUsersDto ): Promise<Conversation | null>
  abstract getUserConversations( userId: number ): Promise<Conversation[]>
}
