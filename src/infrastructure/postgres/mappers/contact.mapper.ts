import { Contact } from "../../../domain/entities";

export class ContactMapper {
    public static fromRow( row: any ): Contact {
        return new Contact(
            row.id,
            row.user_id,
            row.contact_user_id,
            row.created_at,
            row.is_active,
            row.username,
            row.email,
            row.deleted_at
        )
    }
}