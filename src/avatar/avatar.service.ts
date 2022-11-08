import { Injectable, HttpException, Logger, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { isEthereumAddress } from 'class-validator'
import { CsbService } from 'src/csb/csb.service'
import { Repository } from 'typeorm'
import { Avatar } from './avatar.entity'
import { NameService } from './inputs/name-service.input'
import { EnsService } from 'src/ens/ens.service'
import { LensService } from 'src/lens/lens.service'
import { getNS } from 'src/utils'

type TAvatarInput = {
  address?: string
  ens?: NameService
  csb?: NameService
  lens?: NameService
}

type TAvatarWhere = {
  address?: string
  ens?: Partial<NameService>
  csb?: Partial<NameService>
  lens?: Partial<NameService>
}

@Injectable()
export class AvatarService {
  public logger: Logger

  @Inject(CsbService)
  private readonly csbService: CsbService

  @Inject(EnsService)
  private readonly ensService: EnsService

  @Inject(LensService)
  private readonly lensService: LensService

  constructor(
    @InjectRepository(Avatar) private avatarRepository: Repository<Avatar>,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger('AvatarService')
  }

  insertByDefaults(input: TAvatarInput): Avatar {
    const defaultInput = {
      address: '',
      ens: {
        handle: '',
        avatar: '',
      },
      csb: {
        handle: '',
        avatar: '',
      },
      lens: {
        handle: '',
        avatar: '',
      },
    }

    return Object.assign({}, defaultInput, input)
  }

  async find(addressOrNs: string) {
    const NS = getNS(addressOrNs)
    const isNS = NS !== ''
    const isAddress = isEthereumAddress(addressOrNs)

    if (!isNS && !isAddress) {
      this.logger.warn(`addressOrNs is wrong: ${addressOrNs}`)
      throw new HttpException({ message: `addressOrNs is wrong: ${addressOrNs}` }, 200)
    }

    let where: TAvatarWhere
    let service
    if (isAddress) {
      where = { address: addressOrNs }
    } else {
      switch (NS) {
        case '.eth':
          where = { ens: { handle: addressOrNs } }
          service = this.ensService
          break
        case '.lens':
          where = { lens: { handle: addressOrNs } }
          service = this.lensService
          break
        case '.csb':
          where = { csb: { handle: addressOrNs } }
          service = this.csbService
          break
      }
    }

    const exist = await this.avatarRepository.countBy(where)
    if (!exist) {
      if (isNS) {
        const { address } = await service.findAvatar(addressOrNs)
        return await this.insertAllByAddress(address)
      }

      if (isAddress) {
        return await this.insertAllByAddress(addressOrNs)
      }
    } else {
      const avatar = await this.avatarRepository.findOneBy({ address: addressOrNs })
      console.log(avatar)
      return avatar
    }
  }

  async insertAllByAddress(address: string) {
    const ens = await this.ensService.findAvatarByAddress(address)
    const csb = await this.csbService.findAvatarByAddress(address)
    const lens = await this.lensService.findAvatarByAddress(address)
    const avatar = new Avatar()
    avatar.address = address
    avatar.ens = ens
    avatar.csb = csb
    avatar.lens = lens

    const resp = await this.avatarRepository.create(avatar)

    if (resp) {
      await this.avatarRepository.save(resp)
    }
    return resp
  }
}
