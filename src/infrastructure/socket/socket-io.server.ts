import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { SocketController } from '../../presentation/controllers/socket.controller'
import { SocketAuthMiddleware } from '../../presentation/middlewares'

interface SocketIOServerOptions {
    httpServer: HTTPServer,
    socketController: SocketController
}

export class SocketIOServerFactory {

    public static create({ httpServer, socketController }: SocketIOServerOptions): SocketIOServer {
        const io = new SocketIOServer(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        })

        io.use(SocketAuthMiddleware.authenticate())

        io.on('connection', (socket) => { socketController.handleConnection(socket) })

        console.log('[SocketIOServerFactory] Socket.IO server configurado')

        return io
    }

}