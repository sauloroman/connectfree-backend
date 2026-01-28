import { Request, Response } from "express";
import { GetUserByIdUseCase, LoginUserUseCase, RegisterUserUseCase, RenewSessionUseCase, SearchUsersUseCase } from "../../application/use-cases/users";
import { LoginUserValidator, RegisterUserValidator } from "../validators/users";
import { SocketGateway } from "../../domain/gateways/socket.gateway";

export class UserController {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly searchUsersUseCase: SearchUsersUseCase,
        private readonly renewSessionUseCase: RenewSessionUseCase,
        private readonly socketGateway?: SocketGateway
    ) {}

    private sendError(res: Response, errorMessage: string, statusCode?: number) {
        res.status(statusCode ?? 400).json({
            ok: false,
            message: errorMessage
        })
    }

    public renewAuth = async ( req: Request, res: Response ) => {
        try {
            
            const {tokenId} = req.params
            const {user, token} = await this.renewSessionUseCase.execute(tokenId as string)

            res.status(200).json({
                ok: true,
                user,
                token
            })
            
        } catch( error: any ) {
            this.sendError(res, error.message, 401)
        }
    }

    public register = async (req: Request, res: Response) => {
        try {
            
            const [dto, errorMessage] = RegisterUserValidator.validate(req.body)
            
            if (errorMessage) {
                return this.sendError(res, errorMessage, 400)
            }

            const userCreated = await this.registerUserUseCase.execute(dto!)

            res.status(201).json({
                ok: true,
                user: userCreated
            })

        } catch (error: any) {
            this.sendError(res, error.message, 400)
        }
    }

    public login = async (req: Request, res: Response) => {
        try {

            const [ dto, errorMessage ] = LoginUserValidator.validate( req.body )

            if (errorMessage) {
                return this.sendError(res, errorMessage, 400)
            }

            const { token, user } = await this.loginUserUseCase.execute(dto!)

            res.status(200).json({
                ok: true,
                user,
                token
            })

        } catch (error: any) {
            this.sendError(res, error.message, 401)
        }
    }
    
    public profile = async (req: Request, res: Response) => {
        try {
            
            const userId = req.body.user.id
            
            const user = await this.getUserByIdUseCase.execute(userId)

            res.status(200).json({
                ok: true,
                user
            })

        } catch( error: any ) {
            this.sendError(res, error.message, 404)
        }
    }

    public search = async ( req: Request, res: Response ) => {
        try {

            const users = await this.searchUsersUseCase.execute({
                query: req.query.q as string,
                limit: req.query.limit ? Number(req.query.limit) : undefined
            })

            res.status(200).json({
                ok: true,
                users
            })
        } catch( error: any ){
            this.sendError(res, error.message, 400)
        }
    }

    public getOnlineUsers = ( _req: Request, res: Response ) => {
        try {
            if (!this.socketGateway) {
                return this.sendError(res, 'Servicio de presencia no disponible', 503)
            }

            const onlineUsers = this.socketGateway.getOnlineUsers()

            res.status(200).json({
                ok: true,
                onlineUsers
            })

        } catch( error: any ) {
            this.sendError(res, error.message, 400)
        }
    }

}