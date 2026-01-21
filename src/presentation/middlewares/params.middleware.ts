import { NextFunction, Request, Response } from "express";

export class ParamsMiddleware {

    public static isContactUserIdValid() {
        return ( req: Request, res: Response, next: NextFunction ) => {

            const contactUserId = Number(req.params.contactUserId)

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