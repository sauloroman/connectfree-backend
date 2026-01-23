import { CreateOrGetConversationUseCase, GetConversationByIdUseCase, GetUserConversationsUseCase } from "../application/use-cases/conversations";
import { ConversationDatasourcePostgres, ConversationParticipantDatasourcePostgres } from "../infrastructure/postgres/datasources";
import { ConversationRepositoryImpl } from "../infrastructure/postgres/repositories";
import { ConversationController } from "../presentation/controllers/conversation.controller";
import { ConversationRoutes } from "../presentation/routes";
import { ContactsContainer } from "./contacts.container";

export class ConversationsContainer {

    public readonly conversationRoutes: ConversationRoutes
    public static conversationRepository: ConversationRepositoryImpl

    constructor(){

        // Repositorio de PostgreSQL
        if ( !ContactsContainer.contactsRepository ) {
            ConversationsContainer.conversationRepository = new ConversationRepositoryImpl( 
                new ConversationDatasourcePostgres(),
                new ConversationParticipantDatasourcePostgres() 
            ) 
        }

        // Casos de uso
        const createOrGetConversationUC = new CreateOrGetConversationUseCase(
            ConversationsContainer.conversationRepository,
            ContactsContainer.contactsRepository
        )
        const getConversationByIdUC = new GetConversationByIdUseCase(
            ConversationsContainer.conversationRepository
        )
        const getUserConversationsUC = new GetUserConversationsUseCase(
            ConversationsContainer.conversationRepository
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