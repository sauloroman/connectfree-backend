import { UserDatasource } from "../../../domain/datasources";
import { CreateUserDto, SearchUserDto } from "../../../domain/dtos/user.dto";
import { User } from "../../../domain/entities";
import { postgresPool } from "../database/postgres.pool";
import { UserMapper } from "../mappers/user.mapper";

export class UserDatasourcePostgres implements UserDatasource {
    
    async create(data: CreateUserDto): Promise<User> {
        try {
            
            const result = await postgresPool.query(`
                INSERT INTO users (username, email, password)
                VALUES ($1, $2, $3) 
                RETURNING *   
            `, [data.username, data.email, data.password])

            const row = result.rows[0]
            return UserMapper.fromRow(row)
        } catch( error: any ) {
            throw new Error('[UserDatasourcePostgres] - Error al insertar usuario nuevo', error)
        }
    }

    async findById(id: number): Promise<User | null> {
        try {

            const result = await postgresPool.query(`
                SELECT *
                FROM users
                WHERE id = $1    
            `, [id])

            return result.rows.length === 0 
                ? null
                : UserMapper.fromRow(result.rows[0])

        } catch( error: any ){
            throw new Error('[UserDatasourcePostgres] - Error al obtener usuario por id', error)
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {

            const result = await postgresPool.query(`
                SELECT *
                FROM users
                WHERE email = $1
            `, [email])

            return result.rows.length === 0 
                ? null
                : UserMapper.fromRow(result.rows[0])

        } catch( error: any ) {
            throw new Error('[UserDatasourcePostgres] - Error al obtener usuario por email', error)
        }
    }

    async searchByUsername(data: SearchUserDto): Promise<User[]> {
        try {
            const result = await postgresPool.query(`
                SELECT *
                FROM users
                WHERE username ILIKE $1 OR email ILIKE $1
                LIMIT $2
            `, [`%${data.query}%`, data.limit ?? 10])

            return result.rows.map(UserMapper.fromRow)
        } catch( error: any ) {
             throw new Error('[UserDatasourcePostgres] - Error al buscar usuarios', error)
        }
    }

}