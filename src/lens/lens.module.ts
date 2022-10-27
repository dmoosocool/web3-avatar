import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LensService } from './lens.service'
import { LensController } from './lens.controller'

@Module({
  imports: [HttpModule],
  providers: [LensService],
  controllers: [LensController],
})
export class LensModule {}
