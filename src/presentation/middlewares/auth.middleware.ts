import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/plugin/jwt.plugin";

export class AuthMiddleware {

    public static validateLoggedUser() {
        return async ( req: Request, res: Response, next: NextFunction ) => {
            if ( req.method === 'GET' || req.method === 'PATCH' || req.method === 'DELETE') {
                req.body = {}
            }

            const authHeader = req.headers.authorization

            if (!authHeader) {
                return res.status(401).json({ message: 'Inicia sesión primero' })
            }

            const token = authHeader.split(' ').at(1) || ''

            if (!authHeader.startsWith('Bearer ') || !token) {
                return res.status(401).json({ message: 'No hay token válido' })
            }

            try {
                const payload = await JwtAdapter.validateToken<{id: string}>(token) 
                req.body.user = { id: payload?.id ?? '' }

                next()
            } catch(error: any) {
                console.log(error)
                return res.status(401).json({ message: 'Token Inválido o Expirado' })
            }

        }
    }

}