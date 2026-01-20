import { ConversationBetweenUsersDto } from '../dtos/conversation.dto'
import { Conversation } from '../entities/conversation.entity'

export abstract class ConversationRepository {
  abstract createOrGet( data: ConversationBetweenUsersDto ): Promise<Conversation>
  abstract getById( conversationId: number ): Promise<Conversation | null>
  abstract getByUser( userId: number ): Promise<Conversation[]>
}
