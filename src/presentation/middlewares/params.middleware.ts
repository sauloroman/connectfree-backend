import { NextFunction, Request, Response } from "express";

export class ParamsMiddleware {

    public static isIdValid( idName: string ) {
        return ( req: Request, res: Response, next: NextFunction ) => {

            const contactUserId = Number(req.params[`${idName}`])

            if ( isNaN(contactUserId) ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El id de contacto es invalido'
                })
            }

            next()
        }
    }

}