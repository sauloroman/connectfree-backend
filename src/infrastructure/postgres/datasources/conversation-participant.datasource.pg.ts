import { ConversationParcipantDatasource } from "../../../domain/datasources/conversation-participant.datasource";
import { AddParticipantDto, GetConversationParticipantsDto } from "../../../domain/dtos/conversation.dto";
import { ConversationParticipant } from "../../../domain/entities";
import { postgresPool } from "../database/postgres.pool";
import { ConversationParticipanMapper } from "../mappers";

export class ConversationParticipantDatasourcePostgres extends ConversationParcipantDatasource {
    
    async addParticipant(data: AddParticipantDto): Promise<ConversationParticipant> {
        try {
            const result = await postgresPool.query(`
                INSERT INTO conversation_participants ( conversation_id, user_id )
                VALUES ($1, $2)
                RETURNING *
            `, [data.conversationId, data.userId])

            return ConversationParticipanMapper.fromRow(result.rows[0])

        } catch( error: any ) {
            throw new Error('[ConversationParticipantDatasourcePostgres] - Error al agregar participante ' + error.message)
        }
    }
    
    async getParticipants(data: GetConversationParticipantsDto): Promise<ConversationParticipant[]> {
        try {
            const result = await postgresPool.query(`
                SELECT * FROM conversation_participants
                WHERE conversation_id = $1
            `, [data.conversationId])

            return result.rows.map( ConversationParticipanMapper.fromRow )
        } catch( error: any ) {
            throw new Error('[ConversationParticipantDatasourcePostgres] - Error al obtener participantes: ' + error.message)
        }
    }
    
    async isParticipant(conversationId: number, userId: number): Promise<boolean> {
        try {
            const result = await postgresPool.query(`
                SELECT 1 
                FROM conversation_participants
                WHERE conversation_id = $1 AND user_id = $2
            `, [conversationId, userId])

            return result.rows.length > 0

        } catch( error: any ) {
            throw new Error('[ConversationParticipantDatasourcePostgres] - Error al verificar participante: ' + error.message)
        }
    }
    
    async removeParticipant(conversationId: number, userId: number): Promise<void> {
        try {
            await postgresPool.query(`
                DELETE FROM conversation_participants
                WHERE conversation_id = $1 AND user_id = $2    
            `, [conversationId, userId])
        } catch( error: any ) {
            throw new Error("[ConversationParticipantDatasourcePostgres] - Error al eliminar participante: " + error.message);
        }
    }

}