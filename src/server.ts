import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})

let server: Server

//database connection
async function bootstrap() {
  try {
    await mongoose.connect(`${config.database_url}`)
    logger.info(`🛢 Database connection successful`)
    app.listen(config.port, () => {
      logger.info(
        `Application listening on port http://localhost:${config.port}`,
      )
    })
  } catch (err) {
    errorlogger.error(`Failed to connect database`, err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
