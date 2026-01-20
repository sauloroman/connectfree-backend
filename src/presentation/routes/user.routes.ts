import { Router } from "express";
import { UserController } from "../controllers";

export class UserRoutes {

    public readonly routes: Router
    private readonly controller: UserController

    constructor(controller: UserController) {
        this.controller = controller
        this.routes = this.initRoutes()
    }

    private initRoutes(): Router {
        const router = Router()

        router.post('/register', this.controller.register)

        return router
    }

}