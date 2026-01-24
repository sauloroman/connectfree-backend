import { EditMessageDto } from "../../../domain/dtos/message.dto";
import { Message } from "../../../domain/entities";
import { MessageRepository } from "../../../domain/repositories";

export class EditMessageUseCase {

    constructor(private readonly messageRepository: MessageRepository){}

    public async execute(data: EditMessageDto): Promise<Message> {
        const { messageId, newContent, userId } = data
    
        if ( !newContent || newContent.trim().length === 0 ) {
            throw new Error('El mensaje no puede estar vacío')
        }

        if ( newContent.length > 1000 ) {
            throw new Error('El mensaje es demasiado largo (máximo 1000 caracteres)')
        }

        const message = await this.messageRepository.getById(messageId)
        if ( !message ) {
            throw new Error('Mensaje no encontrado')
        }

        if ( message.getSenderId !== userId ) {
            throw new Error('Solo puedes editar tus propios mensajes')
        }

        return await this.messageRepository.edit({
            messageId,
            userId,
            newContent
        })

    }

}