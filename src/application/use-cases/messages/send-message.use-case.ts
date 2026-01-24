import { ConversationRepository, MessageRepository } from "../../../domain/repositories";
import { SendMessageDto } from "../../../domain/dtos/message.dto";
import { Message } from "../../../domain/entities";

export class SendMessageUseCase {

  constructor( 
    private readonly messageRepository: MessageRepository,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  async execute(data: SendMessageDto): Promise<Message> {
    const { content, conversationId, senderId } = data

    if ( !content || content.trim().length === 0 ) {
      throw new Error('El mensaje no puede estar vacío')
    }

    if ( content.length > 1000 ) {
      throw new Error('El mensaje es demasiado largo (máximo 1000 caracteres)')
    }

    const conversation = await this.conversationRepository.getById( conversationId )
    if ( !conversation ) {
      throw new Error('Conversación no encontrada')
    }

    const isParticipant = await this.conversationRepository.isUserInConversation(conversationId, senderId)
    if ( !isParticipant ) {
      throw new Error('No tienes permiso para enviar mensajes en esta conversacion.')
    }

    return this.messageRepository.send({
      conversationId,
      senderId,
      content: content.trim()
    });
  }
}
