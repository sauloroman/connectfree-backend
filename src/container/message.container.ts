import { DeleteMessageUseCase, EditMessageUseCase, GetMessageHistoryUseCase, SendMessageUseCase } from "../application/use-cases/messages";
import { MessageDatasourcePostgres } from "../infrastructure/postgres/datasources";
import { MessageRepositoryImpl } from "../infrastructure/postgres/repositories";
import { MessageController } from "../presentation/controllers/message.controller";
import { MessageRoutes } from "../presentation/routes";
import { ConversationsContainer } from "./conversations.container";

export class MessageContainer {

    public readonly messageRoutes: MessageRoutes
    public static messageRepository: MessageRepositoryImpl

    constructor() {
        
        // Repositorio
        if ( !MessageContainer.messageRepository ) {
            MessageContainer.messageRepository = new MessageRepositoryImpl( new MessageDatasourcePostgres() )
        }

        // Casos de uso
        const sendMessageUC = new SendMessageUseCase( 
            MessageContainer.messageRepository, 
            ConversationsContainer.conversationRepository 
        )
        const getMessageHistoryUC = new GetMessageHistoryUseCase(
            MessageContainer.messageRepository,
            ConversationsContainer.conversationRepository
        )
        const editMessageUC = new EditMessageUseCase(MessageContainer.messageRepository)
        const deleteMessageUC = new DeleteMessageUseCase(MessageContainer.messageRepository)

        // Controlador
        const messageController = new MessageController(
            sendMessageUC,
            getMessageHistoryUC,
            editMessageUC,
            deleteMessageUC
        )

        // Rutas
        this.messageRoutes = new MessageRoutes(messageController)
    }

}