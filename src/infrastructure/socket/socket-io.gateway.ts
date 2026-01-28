import { Server as SocketIOServer} from 'socket.io'
import { SocketGateway } from "../../domain/gateways/socket.gateway";
import { ContactDatasource, ConversationParcipantDatasource } from '../../domain/datasources';

export class SocketIOGateway implements SocketGateway {

    private io: SocketIOServer
    private userSocketMap: Map<number, string> = new Map()
    private socketUserMap: Map<string, number> = new Map()
    private readonly participantDatasource: ConversationParcipantDatasource
    private readonly contactDatasource: ContactDatasource

    constructor(
        io: SocketIOServer, 
        participantDatasource: ConversationParcipantDatasource,
        contactDatasource: ContactDatasource 
    ){
        this.io = io
        this.participantDatasource = participantDatasource
        this.contactDatasource = contactDatasource
    }
    
    public registerUser( userId: number, socketId: string ): void {
        this.userSocketMap.set(userId, socketId)
        this.socketUserMap.set(socketId, userId)
        console.log(`[SocketIOGateway] Usuario ${userId} conectado con socket ${socketId}`)
    }

    public unregisterUser( socketId: string ): number | null {
        const userId = this.socketUserMap.get(socketId)
        if ( userId ) {
            this.socketUserMap.delete(socketId)
            this.userSocketMap.delete(userId)
            console.log(`[SocketIOGateway] Usuario ${userId} desconectado`)
            return userId
        }
        return null
    }

    public emitToUser(userId: number, event: string, data: any): void {
        const socketId = this.userSocketMap.get(userId)
        if ( socketId ) {
            this.io.to(socketId).emit(event, data)
            console.log(`[SocketIOGateway] Evento '${event}' enviado a usuario ${userId}`)
        }
    }
    
    public async emitToConversation(conversationId: number, event: string, data: any): Promise<void> {
        try {
            const participants = await this.participantDatasource.getParticipants({conversationId})

            participants.forEach( par => {
                this.emitToUser(par.getUserId, event, data)
            })
        } catch(error: any) {
            throw new Error(`[SocketIOGateway] Error al emitir la conversación: ${error.message}`)
        }
    }
    
    public async emitToUserContacts( userId: number, event: string, data: any ): Promise<void> {
        try {
            const contacts = await this.contactDatasource.getContactsByUser(userId)

            contacts.forEach( contact => {
                this.emitToUser(contact.getContactUserId, event, data)
            })
        } catch( error: any ) {
            throw new Error('[SocketIOGateway] - Error al emitir a contactos:', error.message)
        }
    }

    public getUserSocketId(userId: number): string | null {
        return this.userSocketMap.get(userId) || null
    }

    public getUserIdFromSocket(socketId: string): number | null {
        return this.socketUserMap.get(socketId) || null
    }
    
    public async isUserOnline(userId: number): Promise<boolean> {
        return this.userSocketMap.has(userId)
    }
    
    public getOnlineUsers(): number[] {
        return Array.from(this.userSocketMap.keys())
    }

}