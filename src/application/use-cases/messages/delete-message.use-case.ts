import { DeleteMessageDto } from "../../../domain/dtos/message.dto";
import { MessageRepository } from "../../../domain/repositories";

export class DeleteMessageUseCase {

    constructor(private readonly messageRepository: MessageRepository){}

    public async execute(data: DeleteMessageDto): Promise<void> {
        const { messageId, userId } = data

        const message = await this.messageRepository.getById(messageId)
        if ( !message ) {
            throw new Error('Mensaje no encontrado')
        }

        if ( message.getSenderId !== userId ) {
            throw new Error('Solo puedes eliminar tus propios mensajes')
        }

        await this.messageRepository.remove(data)
    }

}