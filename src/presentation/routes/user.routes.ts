import { Router } from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

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
        router.post('/login', this.controller.login )

        router.get('/me', [AuthMiddleware.validateLoggedUser()], this.controller.profile)
        router.get('/search', [AuthMiddleware.validateLoggedUser()], this.controller.search)

        return router
    }

}