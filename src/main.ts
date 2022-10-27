import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const config = app.get(ConfigService)
  const PORT = config.get<number>('port')
  const logger = new Logger('Bootstrap')

  await app.listen(PORT, '0.0.0.0')
  logger.log(`Web3-Avatar is running on http://0.0.0.0:${PORT}`)
}
bootstrap()
