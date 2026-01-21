import { Request, Response } from "express";
import { AddContactUseCase, GetUserContactsUseCase, RemoveContactUseCase } from "../../application/use-cases/contacts";
import { AddContactValidator } from "../validators/contacts";

export class ContactsController {

    constructor(
        private readonly addContactUseCase: AddContactUseCase,
        private readonly removeContactUseCase: RemoveContactUseCase,
        private readonly getUserContactsUseCase: GetUserContactsUseCase
    ) { }

    private sendError(res: Response, errorMessage: string, statusCode?: number) {
        res.status(statusCode ?? 400).json({
            ok: false,
            message: errorMessage
        })
    }

    public add = async (req: Request, res: Response) => {
        try {

            const userId = req.body.user.id
            const [ contactUserId, errorMessage ] = AddContactValidator.validate( req.body )

            if ( errorMessage ) {
                return this.sendError(res, errorMessage, 400)
            }

            const contact = await this.addContactUseCase.execute({
                userId,
                contactUserId: contactUserId!
            })

            res.status(201).json({
                ok: true,
                contact
            })

        } catch (error: any) {
            this.sendError(res, error.message, 400)
        }
    }

    public remove = async (req: Request, res: Response) => {
        try {

            const userId = req.body.user.id
            const contactUserId  = Number(req.params.contactUserId)

            await this.removeContactUseCase.execute({
                userId,
                contactUserId
            })

            res.status(200).json({
                ok: true,
                msg: 'Contacto Eliminado'    
            })

        } catch( error: any ) {
            this.sendError(res, error.message, 400)
        }
    }

    public list = async (req: Request, res: Response) => {
        try {

            const userId = req.body.user.id

            const contacts = await this.getUserContactsUseCase.execute(userId)

            res.status(200).json({
                ok: true,
                contacts
            })

        } catch( error: any ) {
            this.sendError(res, error.message, 400)
        }
    }

}