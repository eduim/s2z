import express, { Express } from 'express'
import { Server } from 'http'
import cors from 'cors'
import { PORT, HOST } from './lib/constants'
import Logger from './lib/logger'
import errorHandler from './middlewares/error-handler'

import { router, authRouter } from './routes'

const app: Express = express()
const port = PORT || 8080

app.use(cors())
app.use(express.json())

app.use(router)
app.use(authRouter)

app.use(errorHandler)
function startServer(): Server {
  const server = app.listen(port, () => {
    Logger.info(`[server]: Server is running at http://${HOST}:${PORT}`)
  })

  process.on('SIGINT', () => {
    server.close()
  })
  return server
}

export default startServer
