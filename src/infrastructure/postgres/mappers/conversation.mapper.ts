import { Conversation } from "../../../domain/entities";

export class ConversationMapper {
  static fromRow(row: any): Conversation {
    return new Conversation(
      row.id,
      row.created_at
    )
  }
}
