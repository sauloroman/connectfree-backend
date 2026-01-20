import { User } from "../../../domain/entities";

export class UserMapper {
    static fromRow(row: any): User {
        return new User(
            row.id,
            row.username,
            row.email,
            row.password,
            row.created_at
        )
    }
}