import { GetUserByIdUseCase, LoginUserUseCase, RegisterUserUseCase, SearchUsersUseCase } from "../application/use-cases/users";
import { UserDatasourcePostgres } from "../infrastructure/postgres/datasources";
import { UserRepositoryImpl } from "../infrastructure/postgres/repositories";
import { UserController } from "../presentation/controllers";
import { UserRoutes } from "../presentation/routes/user.routes";

export class UserContainer {

    public readonly userRoutes: UserRoutes
    public static userRepository: UserRepositoryImpl

    constructor(){
        // Repositorio de PostgreSQL
        if ( !UserContainer.userRepository ) {
            UserContainer.userRepository = new UserRepositoryImpl( new UserDatasourcePostgres() )
        }

        // Casos de uso
        const registerUserUC = new RegisterUserUseCase( UserContainer.userRepository )
        const loginUserUC = new LoginUserUseCase( UserContainer.userRepository )
        const getUserByIdUC = new GetUserByIdUseCase( UserContainer.userRepository )
        const searchUsersUC = new SearchUsersUseCase( UserContainer.userRepository )

        // Controlador
        const userController = new UserController(
            registerUserUC,
            loginUserUC,
            getUserByIdUC,
            searchUsersUC
        )

        // Rutas
        this.userRoutes = new UserRoutes( userController )
    }

}