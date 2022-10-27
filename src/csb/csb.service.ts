import { HttpService } from '@nestjs/axios'
import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
          this.logger.warn(response)
          throw new BadRequestException()
        }),
      ),
    )

    if (!data) {
      this.logger.warn(`cannot resolver handle: ${handle}`)
      throw new HttpException({ message: `cannot resolver the handle: \`${handle}\`` }, 200)
    }

    let avatar = data.metadata.content.avatars[0]

    avatar = avatar.startsWith('ipfs://') ? avatar.replace('ipfs://', this.configService.get('ipfs')) : avatar
    return { avatar }
  }
}
