import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import type { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const config = app.get(ConfigService)
  const PORT = config.get<number>('port')
  const logger = new Logger('Bootstrap')

  app.useStaticAssets('public')
  await app.listen(PORT, '0.0.0.0')
  logger.log(`Web3-Avatar is running on http://0.0.0.0:${PORT}`)
}
bootstrap()
