import { CreateOrGetConversationUseCase, GetConversationByIdUseCase, GetUserConversationsUseCase } from "../application/use-cases/conversations";
import { ContactDatasourcePostgres, ConversationDatasourcePostgres, ConversationParticipantDatasourcePostgres } from "../infrastructure/postgres/datasources";
import { ContactRepositoryImpl, ConversationRepositoryImpl } from "../infrastructure/postgres/repositories";
import { ConversationController } from "../presentation/controllers/conversation.controller";
import { ConversationRoutes } from "../presentation/routes";

export class ConversationsContainer {

    public readonly conversationRoutes: ConversationRoutes

    constructor(){

        // Repositorio de PostgreSQL
        const conversationRepository = new ConversationRepositoryImpl( 
            new ConversationDatasourcePostgres(),
            new ConversationParticipantDatasourcePostgres() 
        ) 

        const contactsRepository = new ContactRepositoryImpl(
            new ContactDatasourcePostgres()
        )
        
        // Casos de uso
        const createOrGetConversationUC = new CreateOrGetConversationUseCase(
            conversationRepository,
            contactsRepository
        )
        const getConversationByIdUC = new GetConversationByIdUseCase(
            conversationRepository
        )
        const getUserConversationsUC = new GetUserConversationsUseCase(
            conversationRepository
        )

        // Controlador
        const conversationController = new ConversationController(
            createOrGetConversationUC,
            getUserConversationsUC,
            getConversationByIdUC
        )

        // Rutas
        this.conversationRoutes = new ConversationRoutes(conversationController)
    }

}