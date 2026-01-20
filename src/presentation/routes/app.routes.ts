import { Router } from "express";
import { UserRoutes } from "./user.routes";

export class AppRoutes {

    public readonly routes: Router

    constructor(
        private readonly userRoutes: UserRoutes
    ){
        this.routes = this.initRoutes()
    }

    private initRoutes(): Router {
        const router = Router()
        
        router.use('/api/users', this.userRoutes.routes)

        return router
    }


}