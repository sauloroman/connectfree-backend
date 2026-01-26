import { GetUserByIdUseCase, LoginUserUseCase, RegisterUserUseCase, RenewSessionUseCase, SearchUsersUseCase } from "../application/use-cases/users";
import { UserDatasourcePostgres } from "../infrastructure/postgres/datasources";
import { UserRepositoryImpl } from "../infrastructure/postgres/repositories";
import { UserController } from "../presentation/controllers";
import { UserRoutes } from "../presentation/routes/user.routes";

export class UserContainer {

    public readonly userRoutes: UserRoutes

    constructor(){
        // Repositorio de PostgreSQL
        const userRepository = new UserRepositoryImpl( new UserDatasourcePostgres() )

        // Casos de uso
        const registerUserUC = new RegisterUserUseCase( userRepository )
        const loginUserUC = new LoginUserUseCase( userRepository )
        const getUserByIdUC = new GetUserByIdUseCase( userRepository )
        const searchUsersUC = new SearchUsersUseCase( userRepository )
        const renewSessionUC = new RenewSessionUseCase( userRepository )

        // Controlador
        const userController = new UserController(
            registerUserUC,
            loginUserUC,
            getUserByIdUC,
            searchUsersUC,
            renewSessionUC
        )

        // Rutas
        this.userRoutes = new UserRoutes( userController )
    }

}