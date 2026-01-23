import { AppRoutes } from "../presentation/routes/app.routes";
import { ContactsContainer } from "./contacts.container";
import { ConversationsContainer } from "./conversations.container";
import { UserContainer } from "./user.container";

export class Container {

    public readonly appRoutes: AppRoutes

    constructor() {

        const userContainer = new UserContainer()
        const contactsContainer = new ContactsContainer()
        const conversationsContainer = new ConversationsContainer()

        this.appRoutes = new AppRoutes(
            userContainer.userRoutes,
            contactsContainer.contactRoutes,
            conversationsContainer.conversationRoutes
        )

    }

}