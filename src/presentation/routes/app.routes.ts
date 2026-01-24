import { Router } from "express";
import { UserRoutes } from "./user.routes";
import { ContactRoutes } from "./contact.routes";
import { ConversationRoutes } from "./conversation.routes";
import { MessageRoutes } from "./message.routes";

export class AppRoutes {

    public readonly routes: Router

    constructor(
        private readonly userRoutes: UserRoutes,
        private readonly contactRoutes: ContactRoutes,
        private readonly conversationRoutes: ConversationRoutes,
        private readonly messageRoutes: MessageRoutes
    ){
        this.routes = this.initRoutes()
    }

    private initRoutes(): Router {
        const router = Router()
        
        router.use('/api/users', this.userRoutes.routes)
        router.use('/api/contacts', this.contactRoutes.routes)
        router.use('/api/conversations', this.conversationRoutes.routes)
        router.use('/api/messages', this.messageRoutes.routes)

        return router
    }


}