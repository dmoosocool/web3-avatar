import { Controller, Get, Param } from '@nestjs/common'
import { CsbService } from './csb.service'

@Controller('csb')
export class CsbController {
  constructor(private csbService: CsbService) {}
  @Get(':handle')
  public async avatar(@Param('handle') handle: string) {
    return await this.csbService.findAvatar(handle)
  }
}
