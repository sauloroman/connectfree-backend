import { UserDatasourcePostgres } from "../infrastructure/postgres/datasources";
import { UserRepositoryImpl } from "../infrastructure/postgres/repositories";
import { UserController } from "../presentation/controllers";
import { UserRoutes } from "../presentation/routes/user.routes";

export class UserContainer {

    public readonly userRoutes: UserRoutes

    constructor(){
        const userRepository = new UserRepositoryImpl( new UserDatasourcePostgres() )
        const userController = new UserController( userRepository )
        this.userRoutes = new UserRoutes( userController )
    }

}