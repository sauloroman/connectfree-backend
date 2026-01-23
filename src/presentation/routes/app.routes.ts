import { Router } from "express";
import { UserRoutes } from "./user.routes";
import { ContactRoutes } from "./contact.routes";
import { ConversationRoutes } from "./conversation.routes";

export class AppRoutes {

    public readonly routes: Router

    constructor(
        private readonly userRoutes: UserRoutes,
        private readonly contactRoutes: ContactRoutes,
        private readonly conversationRoutes: ConversationRoutes
    ){
        this.routes = this.initRoutes()
    }

    private initRoutes(): Router {
        const router = Router()
        
        router.use('/api/users', this.userRoutes.routes)
        router.use('/api/contacts', this.contactRoutes.routes)
        router.use('/api/conversations', this.conversationRoutes.routes)

        return router
    }


}