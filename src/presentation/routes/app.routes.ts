import { Router } from "express";
import { UserRoutes } from "./user.routes";
import { ContactRoutes } from "./contact.routes";

export class AppRoutes {

    public readonly routes: Router

    constructor(
        private readonly userRoutes: UserRoutes,
        private readonly contactRoutes: ContactRoutes,
    ){
        this.routes = this.initRoutes()
    }

    private initRoutes(): Router {
        const router = Router()
        
        router.use('/api/users', this.userRoutes.routes)
        router.use('/api/contacts', this.contactRoutes.routes)

        return router
    }


}