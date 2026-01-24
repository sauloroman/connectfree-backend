import { Application } from "express"
import { Server as SocketIOServer} from 'socket.io'
import { createServer, Server as HTTPServer } from 'http'

interface ServerOptions {
    app: Application,
    port: number,
    socketIO?: SocketIOServer
}

export class Server {

    private readonly port: number
    private readonly app: Application
    private readonly httpServer: HTTPServer
    private readonly io?: SocketIOServer
    private serverListener?: any

    constructor({ app, port, socketIO }: ServerOptions) {
        this.app = app
        this.port = port
        this.httpServer = createServer()
        this.io = socketIO
    }

    public async start() {
        this.serverListener = this.httpServer.listen( this.port, () => {
            console.log(`Server running in port ${this.port}`)
            if ( this.io ) {
                console.log(`Socket.IO enabled`)
            }
        })
    }

    public close() {
        this.serverListener?.close()
    }

    public get httpServerInstance(): HTTPServer {
        return this.httpServer
    }

}