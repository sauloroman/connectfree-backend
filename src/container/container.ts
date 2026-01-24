import { Server as HTTPServer } from 'http'
import { AppRoutes } from "../presentation/routes/app.routes";
import { ContactsContainer } from "./contacts.container";
import { ConversationsContainer } from "./conversations.container";
import { MessageContainer } from "./message.container";
import { UserContainer } from "./user.container";
import { SocketContainer } from './socket.container';

export class Container {

    public readonly appRoutes: AppRoutes
    public readonly socketContainer?: SocketContainer

    constructor(httpServer?: HTTPServer) {

        const userContainer = new UserContainer()
        const contactsContainer = new ContactsContainer()
        const conversationsContainer = new ConversationsContainer()
        const messageContainer = new MessageContainer()

        this.appRoutes = new AppRoutes(
            userContainer.userRoutes,
            contactsContainer.contactRoutes,
            conversationsContainer.conversationRoutes,
            messageContainer.messageRoutes
        )

        if (httpServer) {
            this.socketContainer = new SocketContainer(httpServer)
        }

    }

}