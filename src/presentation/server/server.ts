import { Application } from "express"
import { createServer, Server as HTTPServer } from 'http'

interface ServerOptions {
    app: Application,
    port: number,
}

export class Server {

    private readonly port: number
    private readonly app: Application
    private readonly httpServer: HTTPServer
    private serverListener?: any

    constructor({ app, port }: ServerOptions) {
        this.app = app
        this.port = port
        this.httpServer = createServer(app)
    }

    public async start() {
        this.serverListener = this.httpServer.listen( this.port, () => {
            console.log(`Server running in port ${this.port}`)
        })
    }

    public close() {
        this.serverListener?.close()
    }

    public get httpServerInstance(): HTTPServer {
        return this.httpServer
    }

}