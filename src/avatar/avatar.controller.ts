import { Controller, Get, Param } from '@nestjs/common'
import { AvatarService } from './avatar.service'

@Controller('avatar')
export class AvatarController {
  constructor(private avatarService: AvatarService) {}
  @Get(':handle')
  public async avatar(@Param('handle') handle: string) {
    return await this.avatarService.find(handle)
  }
}
