import { MessageDatasource } from "../../../domain/datasources";
import { SendMessageDto, MessageHistoryDto } from "../../../domain/dtos/message.dto";
import { Message } from "../../../domain/entities";
import { postgresPool } from "../database/postgres.pool";
import { MessageMapper } from "../mappers";

export class MessageDatasourcePostgres implements MessageDatasource {
    
    async save(data: SendMessageDto): Promise<Message> {
        try {

            const result = await postgresPool.query(`
                INSERT INTO messages (conversation_id, sender_id, content)
                VALUES ($1, $2, $3)   
                RETURNING *
            `, [data.conversationId, data.senderId, data.content])

            return MessageMapper.fromRow(result.rows[0])
        } catch ( error: any ) {
            throw new Error('[MessageDatasourcePostgres] - Error al guardar mensaje', error)
        }
    }
    
    async findByConversation(data: MessageHistoryDto): Promise<Message[]> {
        try {
            
            const result = await postgresPool.query(`
              SELECT * FROM messages
              WHERE conversation_id = $1
              ORDER BY created_at DESC
              LIMIT $2 OFFSET $3
            `, [ data.conversationId, data.limit ?? 50, data.offset ?? 0])

            return result.rows.map( MessageMapper.fromRow )

        } catch( error: any ) {
            throw new Error('[MessageDatasourcePostgres] - Error al encontrar mensaje por conversación', error)
        }
    }

}