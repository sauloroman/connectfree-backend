export abstract class SocketGateway {
    abstract emitToUser( userId: number, event: string, data: any ): void
    abstract emitToConversation( conversationId: number, evet: string, data: any ): Promise<void>
    abstract getUserSocketId( userId: number ): string | null
    abstract isUserOnline( userId: number ): Promise<boolean>   
    abstract getOnlineUsers(): Promise<number[]>
}