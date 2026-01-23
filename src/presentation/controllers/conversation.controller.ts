import { Request, Response } from "express";
import { 
    CreateOrGetConversationUseCase, 
    GetConversationByIdUseCase,
    GetUserConversationsUseCase 
} from "../../application/use-cases/conversations";
import { CreateConversationValidator } from "../validators/conversations";

export class ConversationController {

    constructor(
        private readonly createOrGetConversationUseCase: CreateOrGetConversationUseCase,
        private readonly getUserConversationsUseCase: GetUserConversationsUseCase,
        private readonly getConversationByIdUseCase: GetConversationByIdUseCase
    ){}

    private sendError(res: Response, errorMessage: string, statusCode?: number) {
        res.status(statusCode ?? 400).json({
            ok: false,
            message: errorMessage
        })
    }

    public createOrGet = async ( req: Request, res: Response ) => {
        try {
            const userId = req.body.user.id
            const [ dto, errorMessage ] = CreateConversationValidator.validate( req.body )

            if ( errorMessage ) return this.sendError(res, errorMessage, 400)

            const conversation = await this.createOrGetConversationUseCase.execute({
                userAId: userId,
                userBId: dto?.userBId!
            })

            res.status(200).json({
                ok: true,
                conversation
            })

        } catch( error: any ) {
            this.sendError( res, error.message, 400 )
        }
    }    

    public list = async ( req: Request, res: Response ) => {
        try {
            const userId = req.body.user.id
            const conversations = await this.getUserConversationsUseCase.execute( userId )

            res.status(200).json({
                ok: true,
                conversations
            })
        } catch( error: any ) {
            this.sendError(res, error.message, 400)
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id
            const conversationId = Number(req.query.conversationId)

            const conversation = await this.getConversationByIdUseCase.execute(conversationId, userId)

            res.status(200).json({
                ok: true,
                conversation
            })

        } catch( error: any ) {
            this.sendError(res, error.message, 404)
        }
    }

}