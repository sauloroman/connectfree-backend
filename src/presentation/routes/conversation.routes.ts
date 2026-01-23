import { Router } from "express";
import { ConversationController } from "../controllers/conversation.controller";
import { AuthMiddleware, ParamsMiddleware } from "../middlewares";

export class ConversationRoutes {

    public readonly routes: Router
    private readonly controller: ConversationController;

    constructor(controller: ConversationController){
        this.controller = controller
        this.routes = this.initRoutes()
    }

    private initRoutes(): Router {
        const router = Router()

        router.use(AuthMiddleware.validateLoggedUser())

        router.post('/', this.controller.createOrGet)
        router.get('/', this.controller.list)
        router.get('/:conversationId', [ParamsMiddleware.isIdValid('conversationId')], this.controller.getById )

        return router
    }

}