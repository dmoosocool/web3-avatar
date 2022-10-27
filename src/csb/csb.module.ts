import { Module } from '@nestjs/common'
import { CsbService } from './csb.service'
import { CsbController } from './csb.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [CsbService],
  controllers: [CsbController],
})
export class CsbModule {}
