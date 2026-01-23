import { MessageRepository } from "../../../domain/repositories";
import { SendMessageDto } from "../../../domain/dtos/message.dto";
import { Message } from "../../../domain/entities";

export class SendMessageUseCase {

  constructor( private readonly messageRepository: MessageRepository ) {}

  async execute(data: SendMessageDto): Promise<Message> {
    return this.messageRepository.send(data);
  }
}
