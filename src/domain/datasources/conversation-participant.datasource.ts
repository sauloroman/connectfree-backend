import { AddParticipantDto, GetConversationParticipantsDto } from "../dtos/conversation.dto";
import { ConversationParticipant } from "../entities";

export abstract class ConversationParcipantDatasource {
    abstract addParticipant(data: AddParticipantDto): Promise<ConversationParticipant>
    abstract getParticipants(data: GetConversationParticipantsDto): Promise<ConversationParticipant[]>
    abstract isParticipant(conversationId: number, userId: number): Promise<boolean>
    abstract removeParticipant(conversationId: number, userId: number): Promise<void>
}