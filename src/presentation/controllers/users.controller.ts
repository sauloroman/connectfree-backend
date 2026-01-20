import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories";
import { GetUserByIdUseCase, LoginUserUseCase, RegisterUserUseCase, SearchUsersUseCase } from "../../application/use-cases/users";
import { LoginUserValidator, RegisterUserValidator } from "../validators/users";

export class UserController {

    constructor(private readonly userRepository: UserRepository) { }

    private sendError(res: Response, errorMessage: string, statusCode?: number) {
        res.status(statusCode ?? 400).json({
            ok: false,
            message: errorMessage
        })
    }

    public register = async (req: Request, res: Response) => {
        try {

            const [dto, errorMessage] = RegisterUserValidator.validate(req.body)
            
            if (errorMessage) {
                return this.sendError(res, errorMessage, 400)
            }

            const useCase = new RegisterUserUseCase(this.userRepository)
            const userCreated = await useCase.execute(dto!)

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

            const useCase = new LoginUserUseCase(this.userRepository)
            const { token, user } = await useCase.execute(dto!)

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
            
            const useCase = new GetUserByIdUseCase(this.userRepository)
            const user = await useCase.execute(userId)

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

            const useCase = new SearchUsersUseCase(this.userRepository)

            const users = await useCase.execute({
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

}