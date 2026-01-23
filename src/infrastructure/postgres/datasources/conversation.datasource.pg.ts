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
            throw new Error('[ConversationDatasourcePostgres] - Error al crear conversación ' + error.message)
        } finally {
            client.release()
        }
    }

    async findById(conversationId: number): Promise<Conversation | null> {
        try {
            const result = await postgresPool.query(
                `SELECT * FROM conversations WHERE id = $1`,
                [conversationId]
            )
    
            return result.rows.length > 0
            ? ConversationMapper.fromRow(result.rows[0])
            : null
        } catch( error: any ) {
            throw new Error('[ConversationDatasourcePostgres] - Error al buscar conversación ' + error.message)
        }
    }

    async findConversationBetweenUsers( data: ConversationBetweenUsersDto ): Promise<Conversation | null> {
        try {
            const result = await postgresPool.query(
            `
                SELECT c.*
                FROM conversations c
                    JOIN conversation_participants p1 ON p1.conversation_id = c.id
                    JOIN conversation_participants p2 ON p2.conversation_id = c.id
                WHERE p1.user_id = $1 AND p2.user_id = $2
                AND (
                    SELECT COUNT(*) FROM conversation_participants
                    WHERE conversation_id = c.id
                ) = 2
                LIMIT 1
            `, [data.userAId, data.userBId])
    
            return result.rows.length > 0
            ? ConversationMapper.fromRow(result.rows[0])
            : null
        } catch(error: any) {
            throw new Error('[ConversationDatasourcePostgres] - Error al buscar conversación entre usuarios: ' + error.message)
        }
        
    }

    async getUserConversations(userId: number): Promise<Conversation[]> {
        try {
            const result = await postgresPool.query(
            `
                SELECT DISTINCT c.*
                FROM conversations c
                    INNER JOIN conversation_participants cp ON cp.conversation_id = c.id
                WHERE cp.user_id = $1
                ORDER BY c.created_at DESC
            `, [userId] )
    
            return result.rows.map( ConversationMapper.fromRow)
        } catch( error: any ) {
            throw new Error('[ConversationDatasourcePostgres] - Error al obtener conversaciones del usuario: ' + error.message)
        }
    }
}
