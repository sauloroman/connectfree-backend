import { Router, RouterOptions } from "express";
import { MessageController } from "../controllers/message.controller";
import { AuthMiddleware, ParamsMiddleware } from "../middlewares";

export class MessageRoutes {

    public readonly routes: Router  
    private readonly controller: MessageController

    constructor(controller: MessageController){
        this.controller = controller
        this.routes = this.initRoutes()
    }

    private initRoutes(): Router {
        const router = Router()

        router.use(AuthMiddleware.validateLoggedUser())

        router.post('/conversations/:conversationId/messages', [ParamsMiddleware.isIdValid('conversationId')], this.controller.send )
        router.get('/conversations/:conversationId/messages', [ParamsMiddleware.isIdValid('conversationId')], this.controller.getHistory)
        router.put('/messages/:messageId', this.controller.edit)
        router.delete('/messages/:messageId', this.controller.delete )

        return router
    }

}       

