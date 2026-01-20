import { ConversationDatasource } from '../../../domain/datasources/conversation.datasource'
import { CreateConversationDto, ConversationBetweenUsersDto } from '../../../domain/dtos/conversation.dto'
import { Conversation } from '../../../domain/entities/conversation.entity'
import { postgresPool } from '../database/postgres.pool'
import { ConversationMapper } from '../mappers'

export class ConversationDatasourcePostgres extends ConversationDatasource {

    async create(data: CreateConversationDto): Promise<Conversation> {
        const client = await postgresPool.connect()

        try {
            await client.query('BEGIN')

            const convResult = await client.query(
                `INSERT INTO conversations DEFAULT VALUES RETURNING *`
            )

            const conversationId = convResult.rows[0].id

            for (const userId of data.participants) {
                await client.query(
                `
                    INSERT INTO conversation_participants (conversation_id, user_id)
                    VALUES ($1, $2)
                `, [conversationId, userId] )
            }

            await client.query('COMMIT')

            return ConversationMapper.fromRow(convResult.rows[0])

        } catch (error: any) {
            await client.query('ROLLBACK')
            throw new Error('[ConversationDatasourcePostgres] - Error al crear conversación', error)
        } finally {
            client.release()
        }
    }

    async findById(conversationId: number): Promise<Conversation | null> {
        const result = await postgresPool.query(
            `SELECT * FROM conversations WHERE id = $1`,
            [conversationId]
        )

        return result.rowCount
        ? ConversationMapper.fromRow(result.rows[0])
        : null
    }

    async findConversationBetweenUsers(
        data: ConversationBetweenUsersDto
    ): Promise<Conversation | null> {
        const result = await postgresPool.query(
        `
            SELECT c.*
            FROM conversations c
                JOIN conversation_participants p1 ON p1.conversation_id = c.id
                JOIN conversation_participants p2 ON p2.conversation_id = c.id
            WHERE p1.user_id = $1 AND p2.user_id = $2
        `, [data.userAId, data.userBId])

        return result.rowCount
        ? ConversationMapper.fromRow(result.rows[0])
        : null
    }

    async getUserConversations(userId: number): Promise<Conversation[]> {
        const result = await postgresPool.query(
        `
            SELECT c.*
            FROM conversations c
                JOIN conversation_participants cp ON cp.conversation_id = c.id
            WHERE cp.user_id = $1
        `, [userId] )

        return result.rows.map( ConversationMapper.fromRow)
    }
}
