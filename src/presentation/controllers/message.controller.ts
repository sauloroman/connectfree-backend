import { Request, Response } from "express";
import { DeleteMessageUseCase, EditMessageUseCase, GetMessageHistoryUseCase, SendMessageUseCase } from "../../application/use-cases/messages";
import { SendMessageValidator } from "../validators/messages";
import { EditMessageValidator } from "../validators/messages/edit-message.validator";

export class MessageController {

    constructor(
        private readonly sendMessageUC: SendMessageUseCase,
        private readonly getMessageHistoryUC: GetMessageHistoryUseCase,
        private readonly editMessageUC: EditMessageUseCase,
        private readonly deleteMessageUC: DeleteMessageUseCase,
    ) { }

    private sendError(res: Response, errorMessage: string, statusCode?: number) {
        res.status(statusCode ?? 400).json({
            ok: false,
            message: errorMessage
        })
    }

    public send = async ( req: Request, res: Response ) => {
        try {
            const userId = req.body.user.id
            const conversationId = Number(req.params.conversationId)
            const [ dto, errorMessage ] = SendMessageValidator.validate(req.body)

            if ( errorMessage ) {
                return this.sendError(res, errorMessage, 400)
            }

            const message = await this.sendMessageUC.execute({
                content: dto?.content!,
                conversationId: conversationId,
                senderId: userId
            })

            res.status(201).json({
                ok: true,
                message
            })

        } catch( error: any ) {
            this.sendError(res, error.message, 400)
        }
    }

    public edit = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id
            const messageId = Number(req.params.messageId)

            const [dto, errorMessage] = EditMessageValidator.validate(req.body)

            if ( errorMessage ) {
                return this.sendError(res, errorMessage, 400)
            }

            const message = await this.editMessageUC.execute({
                messageId,
                userId,
                newContent: dto?.newContent!
            })

            res.status(200).json({
                ok: true,
                message
            })
        } catch( error: any ) {
            this.sendError(res, error.message, 400)
        }
    }

    public delete = async ( req: Request, res: Response ) => {
        try {
            const userId = req.body.user.id
            const messageId = Number( req.params.messageId )

            await this.deleteMessageUC.execute({ messageId, userId })

            res.status(200).json({
                ok: true,
                message: 'El mensaje ha sido eliminado correctamente'
            })
        } catch( error: any ) {
            this.sendError(res, error.message, 400)
        }
    }

    public getHistory = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id
            const conversationId = Number(req.params.conversationId)

            const limit = req.query.limit ? Number(req.query.limit) : undefined
            const offset = req.query.offset ? Number(req.query.offset) : undefined
            
            const messages = await this.getMessageHistoryUC.execute({
                conversationId,
                limit: limit ?? 50,
                offset: offset ?? 0,
            }, userId )

            res.status(200).json({
                ok: true,
                messages
            })

        } catch(error: any) {
            this.sendError(res, error.message, 400)
        }
    }

}