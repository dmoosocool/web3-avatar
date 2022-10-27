import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LensService } from './lens/lens.service'
import { LensModule } from './lens/lens.module'
import { EnsService } from './ens/ens.service'
import { EnsModule } from './ens/ens.module'
import { CsbModule } from './csb/csb.module'
import { CsbService } from './csb/csb.service'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [HttpModule, ConfigModule, LensModule, EnsModule, CsbModule],
  controllers: [AppController],
  providers: [AppService, LensService, EnsService, CsbService],
})
export class AppModule {}
