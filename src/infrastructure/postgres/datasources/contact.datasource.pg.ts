import { ContactDatasource } from "../../../domain/datasources";
import { AddContactDto, RemoveContactDto } from "../../../domain/dtos/contact.dto";
import { Contact } from "../../../domain/entities";
import { postgresPool } from "../database/postgres.pool";
import { ContactMapper } from "../mappers";

export class ContactDatasourcePostgres implements ContactDatasource {
    
    async addContact(data: AddContactDto): Promise<Contact> {
        try {
            const existing = await postgresPool.query(`
                SELECT * FROM contacts
                WHERE user_id = $1 AND contact_user_id = $2
            `, [data.userId, data.contactUserId])
            
            if ( existing.rows.length > 0 ) {
                const result = await postgresPool.query(
                    `
                        UPDATE contacts
                        SET is_active = TRUE, deleted_at = NULL
                        WHERE user_id = $1 AND contact_user_id = $2
                        RETURNING *
                    `,
                    [data.userId, data.contactUserId]
                );

                return ContactMapper.fromRow(result.rows[0]);
            }

            const result = await postgresPool.query(`
               INSERT INTO contacts ( user_id, contact_user_id )
               VALUES ($1, $2) 
               RETURNING *
            `, [data.userId, data.contactUserId]);

            const row = result.rows[0]
            return ContactMapper.fromRow(row)
        } catch ( error: any ) {
            throw new Error('[ContactDatasourcePostgres] - Error al insertar contacto nuevo', error)
        }
    }
    
    async removeContact(data: RemoveContactDto): Promise<void> {
        try {
            await postgresPool.query(`
                UPDATE contacts
                SET is_active = FALSE, deleted_at = NOW() 
                WHERE user_id = $1 AND contact_user_id = $2  
            `, [data.userId, data.contactUserId]);
        } catch ( error: any ) {
            throw new Error('[ContactDatasourcePostgres] - Error al eliminar contacto', error)
        }
    }
    
    async getContactsByUser(userId: number): Promise<Contact[]> {
        try {

            const result = await postgresPool.query(`
                SELECT *
                FROM contacts
                WHERE user_id = $1 AND is_active = TRUE 
            `, [userId])

            return result.rows.map( ContactMapper.fromRow )
        } catch( error: any ) {
            throw new Error('[ContactDatasourcePostgres] - Error al obtener los contactos del usuario', error)
        }
    }
    
    async exists(userId: number, contactUserId: number): Promise<boolean> {
        try {
            const result = await postgresPool.query(`
                SELECT 1
                FROM contacts
                WHERE user_id = $1 AND contact_user_id = $2    
            `, [userId, contactUserId])

            return result.rows.length > 0;
        } catch( error: any ) {
            throw new Error('[ContactDatasourcePostgres] - Error al verificar existencia de contacto', error)
        }
    }
}