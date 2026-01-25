import { EnvAdapter } from "./config/plugin"
import { Container } from "./container/container"
import { Server } from "./presentation/server/server"
import { ServerConfiguration } from "./presentation/server/server-configuration"

(async () => {
  await main()
})()

async function main() {

  const config = new ServerConfiguration({
    router: new Container().appRoutes.routes,
    publicPath: 'public'
  })

  const server = new Server({
    app: config.application,
    port: EnvAdapter.PORT
  })

  new Container(server.httpServerInstance)

  await server.start()

  console.log('Aplicación iniciada correctamente')
  console.log(`REST API: http://localhost:${EnvAdapter.PORT}/api`)
  console.log(`Socket.IO: http://localhost:${EnvAdapter.PORT}`)

}