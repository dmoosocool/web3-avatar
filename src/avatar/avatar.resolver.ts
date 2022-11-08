import { Args, Query, Resolver } from '@nestjs/graphql'
import { Avatar } from './avatar.entity'
import { AvatarService } from './avatar.service'

@Resolver(() => Avatar)
export class AvatarResolver {
  constructor(private readonly avatarService: AvatarService) {}
  @Query(() => Avatar)
  async avatar(@Args('addressOrNs', { type: () => String }) addressOrNs: string): Promise<Avatar> {
    return await this.avatarService.find(addressOrNs)
  }
}
