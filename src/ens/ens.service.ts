import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { ethers } from 'ethers'
import { isEthereumAddress } from 'class-validator'

@Injectable()
export class EnsService {
  public prefix = 'https://metadata.ens.domains/mainnet/avatar/'

  public logger: Logger
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.logger = new Logger('EnsService')
  }

  async findAvatar(handle: string) {
    if (!handle.endsWith('.eth')) {
      throw new HttpException('handle must be ends with `.eth`', 200)
    }
    const avatar = this.prefix + handle

    try {
      await firstValueFrom(this.httpService.head(avatar))
    } catch (e) {
      if (e.response.status === 404) {
        throw new HttpException(`cannot found avatar from this handle: \`${handle}\``, 200)
      }
    }
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/${this.configService.get('alchemyKey')}`,
    )
    const resolver = await provider.getResolver(handle)
    const address = await resolver.getAddress()
    return {
      avatar: `${this.prefix}${handle}`,
      handle,
      address,
    }
  }

  async findAvatarByAddress(address: string) {
    if (!isEthereumAddress(address)) {
      this.logger.warn(`error address: ${address}`)
      throw new HttpException({ message: `error address: ${address}` }, 200)
    }

    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/${this.configService.get('alchemyKey')}`,
    )

    const handle = await provider.lookupAddress(address)
    let avatar = ''
    if (handle) {
      avatar = await provider.getAvatar(address)
    }

    return {
      avatar,
      handle: handle === null ? '' : handle,
      address,
    }
  }
}
