import { Socket } from "socket.io";
import { JwtAdapter } from "../../config/plugin";

export class SocketAuthMiddleware {

    public static authenticate() {
        return async (socket: Socket, next: (err?: Error) => void) => {
            try {
                const token = socket.handshake.auth.token

                if ( !token ) {
                    return next(new Error('Token no proporcionado'))
                }
                
                const payload = await JwtAdapter.validateToken<{ id: number }>(token as string)
                
                if ( !payload ) {
                    return next(new Error('Token inválido'))
                }

                (socket as any).userId = payload.id

                next()
            } catch( error: any ) {
                console.log('[SocketAuthMiddleware] Error de autenticación:', error.message)
                next(new Error('Error de autenticación'))
            }
        }
    }

}