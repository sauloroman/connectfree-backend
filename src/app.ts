import { EnvAdapter } from "./config/plugin"
import { Container } from "./container/container"
import { Server } from "./presentation/server/server"
import { ServerConfiguration } from "./presentation/server/server-configuration"

(async () => {
  await main()
})()

async function main() {

  const dependencyInjection = new Container()

  const config = new ServerConfiguration({
    router: dependencyInjection.appRoutes.routes,
    publicPath: 'public'
  })

  const server = new Server({
    app: config.application,
    port: EnvAdapter.PORT
  })

  await server.start()

}