import { AddContactUseCase, GetUserContactsUseCase, RemoveContactUseCase } from "../application/use-cases/contacts";
import { ContactDatasourcePostgres } from "../infrastructure/postgres/datasources";
import { ContactRepositoryImpl } from "../infrastructure/postgres/repositories";
import { ContactsController } from "../presentation/controllers/contacts.controller";
import { ContactRoutes } from "../presentation/routes";

export class ContactsContainer {

    public readonly contactRoutes: ContactRoutes   

    constructor(){

        // Respositorios
        const contactsRepository = new ContactRepositoryImpl( new ContactDatasourcePostgres() )

        // Casos de uso
        const addContactUC = new AddContactUseCase( contactsRepository )
        const removeContactUC = new RemoveContactUseCase( contactsRepository )
        const getUserContactsUC = new GetUserContactsUseCase( contactsRepository )

        // Controlador
        const contactController = new ContactsController(
            addContactUC,
            removeContactUC,
            getUserContactsUC
        )

        // Rutas
        this.contactRoutes = new ContactRoutes(contactController)
        
    }

}