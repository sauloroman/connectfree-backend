import { Message } from "../../../domain/entities";

export class MessageMapper {
  static fromRow(row: any): Message {
    return new Message(
      row.id,
      row.conversation_id,
      row.sender_id,
      row.content,
      row.created_at
    )
  }
}
