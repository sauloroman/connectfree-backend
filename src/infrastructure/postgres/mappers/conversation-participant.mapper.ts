import { ConversationParticipant } from "../../../domain/entities";

export class ConversationParticipanMapper {

    public static fromRow(row: any): ConversationParticipant {
        return new ConversationParticipant(
            row.id,
            row.conversation_id,
            row.user_id
        )
    }

}