import { DeleteMessageUseCase, EditMessageUseCase, GetMessageHistoryUseCase, SendMessageUseCase } from "../application/use-cases/messages";
import { ConversationDatasourcePostgres, ConversationParticipantDatasourcePostgres, MessageDatasourcePostgres } from "../infrastructure/postgres/datasources";
import { ConversationRepositoryImpl, MessageRepositoryImpl } from "../infrastructure/postgres/repositories";
import { MessageController } from "../presentation/controllers/message.controller";
import { MessageRoutes } from "../presentation/routes";
import { ConversationsContainer } from "./conversations.container";

export class MessageContainer {

    public readonly messageRoutes: MessageRoutes

    constructor() {
        
        // Repositorio
        const messageRepository = new MessageRepositoryImpl( new MessageDatasourcePostgres() )
        const conversationRepository = new ConversationRepositoryImpl( 
            new ConversationDatasourcePostgres(),
            new ConversationParticipantDatasourcePostgres() 
        )

        // Casos de uso
        const sendMessageUC = new SendMessageUseCase( 
            messageRepository, 
            conversationRepository 
        )
        const getMessageHistoryUC = new GetMessageHistoryUseCase(
            messageRepository,
            conversationRepository
        )
        const editMessageUC = new EditMessageUseCase(messageRepository)
        const deleteMessageUC = new DeleteMessageUseCase(messageRepository)

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