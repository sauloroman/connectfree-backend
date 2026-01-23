import { ConversationDatasource, ConversationParcipantDatasource } from "../../../domain/datasources"
import { ConversationBetweenUsersDto } from "../../../domain/dtos/conversation.dto"
import { Conversation } from "../../../domain/entities"
import { ConversationRepository } from "../../../domain/repositories"

export class ConversationRepositoryImpl implements ConversationRepository {

  constructor( 
    private readonly conversationDatasource: ConversationDatasource,
    private readonly participantDatasource: ConversationParcipantDatasource
  ) {}

  async createOrGet(
    data: ConversationBetweenUsersDto
  ): Promise<Conversation> {

    const existing = await this.conversationDatasource.findConversationBetweenUsers(data)

    if (existing) return existing

    return await this.conversationDatasource.create({
      participants: [data.userAId, data.userBId]
    })
  }

  async getById(conversationId: number): Promise<Conversation | null> {
    return await this.conversationDatasource.findById(conversationId)
  }

  async getByUser(userId: number): Promise<Conversation[]> {
    return await this.conversationDatasource.getUserConversations(userId)
  }

  async isUserInConversation(conversationId: number, userId: number): Promise<boolean> {
    return await this.participantDatasource.isParticipant( conversationId, userId )
  }
}
