import { Router } from "express";
import { ContactsController } from "../controllers/contacts.controller";
import { AuthMiddleware } from "../middlewares";

export class ContactRoutes {

    public readonly routes: Router
    private readonly controller: ContactsController

    constructor( controller: ContactsController ){
        this.controller = controller
        this.routes = this.initRoutes() 
    }

    private initRoutes(): Router {
        const router = Router()

        router.use(AuthMiddleware.validateLoggedUser())

        router.post('/', this.controller.add)
        router.get('/', this.controller.list )
        router.delete('/:contactUserId', this.controller.remove )

        return router   
    }

}