import { AppRoutes } from '../presentation/routes/app.routes'
import { ContactsContainer } from './contacts.container'
import { ConversationsContainer } from './conversations.container'
import { MessageContainer } from './message.container'
import { UserContainer } from './user.container'
import { SocketContainer } from './socket.container'
import { Server as HTTPServer } from 'http'

export class Container {
  
  public readonly appRoutes: AppRoutes
  public readonly socketContainer?: SocketContainer

  constructor(httpServer?: HTTPServer) {
    
    if (httpServer) {
      this.socketContainer = new SocketContainer(httpServer)
    } 

    const userContainer = new UserContainer(this.socketContainer?.socketGateway) 
    const contactsContainer = new ContactsContainer()
    const conversationContainer = new ConversationsContainer()
    const messageContainer = new MessageContainer()

    this.appRoutes = new AppRoutes(
      userContainer.userRoutes,
      contactsContainer.contactRoutes,
      conversationContainer.conversationRoutes,
      messageContainer.messageRoutes
    )

    console.log('[Container] ✅ Todos los containers inicializados')
  }
}