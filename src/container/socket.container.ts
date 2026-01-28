import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { SocketIOGateway } from '../infrastructure/socket/socket-io.gateway'
import { ConversationRepositoryImpl, MessageRepositoryImpl } from '../infrastructure/postgres/repositories'
import { ContactDatasourcePostgres, ConversationDatasourcePostgres, ConversationParticipantDatasourcePostgres, MessageDatasourcePostgres } from '../infrastructure/postgres/datasources'
import { SendMessageUseCase } from '../application/use-cases/messages'
import { SocketIOServerFactory } from '../infrastructure/socket/socket-io.server'
import { SocketController } from '../presentation/controllers/socket.controller'

export class SocketContainer {

    public static io: SocketIOServer
    public readonly socketGateway: SocketIOGateway 

    constructor( httpServer: HTTPServer ) {

        const messageDatasource = new MessageDatasourcePostgres()
        const conversationDatasource = new ConversationDatasourcePostgres()
        const participantDatasource = new ConversationParticipantDatasourcePostgres()
        const contactDatasource = new ContactDatasourcePostgres()

        const messageRepository = new MessageRepositoryImpl(messageDatasource)
        const conversationRepository = new ConversationRepositoryImpl(
            conversationDatasource,
            participantDatasource
        )

        // Servidor Socket.io
        const io = new SocketIOServer(httpServer)

        // Socket Gateway
        this.socketGateway = new SocketIOGateway(io, participantDatasource, contactDatasource)

        // Casos de uso
        const sendMessageUC = new SendMessageUseCase(
            messageRepository,
            conversationRepository,
            this.socketGateway
        )
        
        // Controlador
        const socketController = new SocketController(sendMessageUC, this.socketGateway)

        SocketContainer.io = SocketIOServerFactory.create({httpServer, socketController})

    }

}