import { Controller, Get, Param } from '@nestjs/common'
import { EnsService } from './ens.service'

@Controller('ens')
export class EnsController {
  constructor(private ensService: EnsService) {}

  @Get(':handle')
  public async avatar(@Param('handle') handle: string) {
    return await this.ensService.findAvatar(handle)
  }
}
