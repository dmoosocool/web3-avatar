import { HttpService } from '@nestjs/axios'
import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { isEthereumAddress } from 'class-validator'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class CsbService {
  public logger: Logger
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.logger = new Logger('CsbService')
  }

  async findAvatar(handle: string) {
    if (!handle.endsWith('.csb')) {
      this.logger.warn(`error handle: ${handle}`)
      throw new HttpException({ message: 'handle must be ends with `.csb`' }, 200)
    }

    const csbHandle = handle.replace('.csb', '')

    const { data } = await firstValueFrom(
      this.httpService.get(`https://indexer.crossbell.io/v1/handles/${csbHandle}/character`).pipe(
        catchError(({ response }) => {
          this.logger.warn(JSON.stringify(response))
          throw new BadRequestException()
        }),
      ),
    )

    if (!data) {
      this.logger.warn(`cannot resolver handle: ${handle}`)
      throw new HttpException({ message: `cannot resolver the handle: \`${handle}\`` }, 200)
    }

    this.logger.log(JSON.stringify(data))
    let avatar = data.metadata.content.avatars[0]

    avatar = avatar.startsWith('ipfs://') ? avatar.replace('ipfs://', this.configService.get('ipfs')) : avatar
    return { avatar, handle, address: data.owner }
  }

  async findAvatarByAddress(address: string) {
    if (!isEthereumAddress(address)) {
      this.logger.warn(`error address: ${address}`)
      throw new HttpException({ message: `error address: ${address}` }, 200)
    }

    const { data } = await firstValueFrom(
      this.httpService
        .get<Record<string, any>>(
          `https://indexer.crossbell.io/v1/addresses/${address}/characters?limit=20&primary=true`,
        )
        .pipe(
          catchError(({ response }) => {
            this.logger.warn(JSON.stringify(response))
            if (response && response.status === 400 && response.data) {
              throw new HttpException({ message: response.data.errors[0].message }, 200)
            } else {
              throw new BadRequestException()
            }
          }),
        ),
    )

    // if (data.count < 1) {
    //   this.logger.warn(`cannot resolver address: ${address}`)
    //   throw new HttpException({ message: `cannot resolver the address: \`${address}\`` }, 200)
    // }

    if (data.count > 0) {
      this.logger.log(JSON.stringify(data))
      const profile = data.list[0]
      let avatar = profile.metadata.content.avatars[0]

      avatar = avatar.startsWith('ipfs://') ? avatar.replace('ipfs://', this.configService.get('ipfs')) : avatar
      return { avatar, handle: `${profile.handle}.csb`, address }
    } else {
      return { avatar: '', handle: '', address }
    }
  }
}
