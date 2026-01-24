import { MessageDatasource } from "../../../domain/datasources";
import { SendMessageDto, MessageHistoryDto, DeleteMessageDto, EditMessageDto } from "../../../domain/dtos/message.dto";
import { Message } from "../../../domain/entities";
import { postgresPool } from "../database/postgres.pool";
import { MessageMapper } from "../mappers";

export class MessageDatasourcePostgres implements MessageDatasource {
    
    async findById(messageId: number): Promise<Message | null> {
        try {
            const result = await postgresPool.query(`
                SELECT *
                FROM messages
                WHERE id = $1
            `, [messageId])

            return result.rows.length === 0
                ? null
                : MessageMapper.fromRow( result.rows[0] )

        } catch( error: any ) {
            throw new Error('[MessageDatasourcePostgres] - Error al buscar mensaje: ' + error.message )
        }
    }

    
    async update(data: EditMessageDto): Promise<Message> {
        try {
            const result = await postgresPool.query(`
                UPDATE messages
                SET content = $1
                WHERE id = $2 AND sender_id = $3
                RETURNING *
            `, [data.newContent, data.messageId, data.userId])
                
            if ( result.rows.length === 0 ) {
                throw new Error('Mensaje no encontrado')
            }
            
            return MessageMapper.fromRow(result.rows[0])
        } catch( error: any ) {
            throw new Error('[MessageDatasourcePostgres] - Error al actualizar mensaje: ' + error.message )
        }
    }

    
    async delete(data: DeleteMessageDto): Promise<void> {
         try {
            await postgresPool.query(`
                DELETE FROM messages
                WHERE id = $1    
            `, [data.messageId])
        } catch( error: any ) {
            throw new Error('[MessageDatasourcePostgres] - Error al eliminar mensaje: ' + error.message )
        }
    }
    
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
            throw new Error('[MessageDatasourcePostgres] - Error al obtener historial: ', error)
        }
    }

}