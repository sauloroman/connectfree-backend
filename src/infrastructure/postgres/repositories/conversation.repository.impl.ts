import { ConversationDatasource } from "../../../domain/datasources"
import { ConversationBetweenUsersDto } from "../../../domain/dtos/conversation.dto"
import { Conversation } from "../../../domain/entities"
import { ConversationRepository } from "../../../domain/repositories"

export class ConversationRepositoryImpl implements ConversationRepository {

  constructor( private readonly datasource: ConversationDatasource ) {}

  async createOrGet(
    data: ConversationBetweenUsersDto
  ): Promise<Conversation> {

    const existing = await this.datasource.findConversationBetweenUsers(data)

    if (existing) return existing

    return this.datasource.create({
      participants: [data.userAId, data.userBId]
    })
  }

  async getById(conversationId: number): Promise<Conversation | null> {
    return await this.datasource.findById(conversationId)
  }

  async getByUser(userId: number): Promise<Conversation[]> {
    return await this.datasource.getUserConversations(userId)
  }
}
