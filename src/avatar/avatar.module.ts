import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CsbModule } from '../csb/csb.module'
import { EnsModule } from '../ens/ens.module'
import { LensModule } from '../lens/lens.module'
import { Avatar } from './avatar.entity'
import { AvatarService } from './avatar.service'
import { AvatarController } from './avatar.controller'

@Module({
  imports: [CsbModule, EnsModule, LensModule, TypeOrmModule.forFeature([Avatar])],
  providers: [AvatarService],
  controllers: [AvatarController],
})
export class AvatarModule {}
