import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CsbModule } from 'src/csb/csb.module'
import { EnsModule } from 'src/ens/ens.module'
import { LensModule } from 'src/lens/lens.module'
import { Avatar } from './avatar.entity'
import { AvatarResolver } from './avatar.resolver'
import { AvatarService } from './avatar.service'

@Module({
  imports: [CsbModule, EnsModule, LensModule, TypeOrmModule.forFeature([Avatar])],
  providers: [AvatarResolver, AvatarService],
})
export class AvatarModule {}
