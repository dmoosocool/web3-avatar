import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { EnsController } from './ens.controller'
import { EnsService } from './ens.service'

@Module({
  imports: [HttpModule],
  providers: [EnsService],
  controllers: [EnsController],
  exports: [EnsService],
})
export class EnsModule {}
