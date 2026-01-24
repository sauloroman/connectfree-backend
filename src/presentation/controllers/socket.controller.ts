import { Socket } from "socket.io";
import { SendMessageUseCase } from "../../application/use-cases/messages";
import { SocketIOGateway } from "../../infrastructure/socket/socket-io.gateway";
import { SendMessageValidator } from "../validators/messages";

export class SocketController {

    constructor(
        private readonly sendMessageUseCase: SendMessageUseCase,
        private readonly socketGateway: SocketIOGateway
    ){}

    private setupEventListeners( socket: Socket, userId: number ) {
        socket.on('message:send', (data) => this.handleSendMessage(socket, userId, data))
        socket.on('typing:start', (data) => this.handleTypingStart(socket, userId, data))
        socket.on('typing:stop', (data) => this.handleTypingStop(socket, userId, data))
        socket.on('disconnect', () => this.handleDisconnect(socket, userId))
    }

    public handleConnection = async ( socket: Socket ) => {
        const userId = (socket as any).userId
        
        if ( !userId ) {
            socket.disconnect()
            return
        }

        this.socketGateway.registerUser(userId, socket.id)

        socket.broadcast.emit('user:online', { userId })

        console.log(`[SocketController] Usuario ${userId} conectado.`)  
        
        this.setupEventListeners( socket, userId )
    }

    private handleDisconnect = (socket: Socket, userId: number) => {
        this.socketGateway.unregisterUser(socket.id)
        socket.broadcast.emit('user:offline', { userId })
        console.log(`[SocketController] Usuario ${userId} desconectado`)
    }

    private handleSendMessage = async (socket: Socket, userId: number, data: any ) => {
        try {
            const { conversationId, content } = data

            if ( !conversationId || typeof conversationId !== 'number' ) {
                socket.emit('error', { message: 'ID de conversación inválido'})
                return
            }

            const [ dto, errorMessage ] = SendMessageValidator.validate({ content })
            if ( errorMessage ) {
                socket.emit('error', { message: errorMessage })
            }

            const message = await this.sendMessageUseCase.execute({
                conversationId,
                senderId: userId,
                content: dto?.content!
            })

            socket.emit('message:sent', {
                message: {
                    id: message.getId,
                    conversationId: message.getConversationId,
                    senderId: message.getSenderId,
                    content: message.getContent,
                    createdAt: message.getCreatedAt
                }
            })

        } catch( error: any ) {
            console.log('[SocketController] Error al enviar mensaje:', error.message)
            socket.emit('error', { message: error.message })
        }
    }

    private handleTypingStart = async (_socket: Socket, userId: number, data: any ) => {
        try {
            const { conversationId } = data
            if ( !conversationId ) return

            await this.socketGateway.emitToConversation(conversationId, 'typing:start', {
                conversationId, 
                userId
            })
        } catch( error: any ) {
            console.error('[SocketController] Error en typing:start:', error.message)
        }
    }
    
    private handleTypingStop = async ( _socket: Socket, userId: number, data: any ) => {
        try {
            const { conversationId } = data
            if ( !conversationId ) return

            await this.socketGateway.emitToConversation(conversationId, 'typing:stop', {
                conversationId,
                userId
            })
        } catch( error: any ) {
            console.error('[SocketController] Error en typing:stop:', error.message)
        }
    }

}   