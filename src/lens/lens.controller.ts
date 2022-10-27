import { Controller, Get, Param } from '@nestjs/common'
import { LensService } from './lens.service'

@Controller('lens')
export class LensController {
  constructor(private lensService: LensService) {}
  @Get(':handle')
  public async avatar(@Param('handle') handle: string) {
    return await this.lensService.findAvatar(handle)
  }
}
