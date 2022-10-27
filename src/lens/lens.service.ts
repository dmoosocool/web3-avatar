import { HttpService } from '@nestjs/axios'
import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { catchError, firstValueFrom } from 'rxjs'
@Injectable()
export class LensService {
  public logger: Logger
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.logger = new Logger('LensService')
  }

  async findAvatar(handle: string): Promise<{ avatar: string }> {
    if (!handle.endsWith('.lens')) {
      this.logger.warn(`error handle: ${handle}`)
      throw new HttpException({ message: 'handle must be ends with `.lens`' }, 200)
    }

    const resp = await firstValueFrom(
      this.httpService
        .post<Record<string, any>>(this.configService.get('lensApi'), {
          query: `
        query lens_avatar($handle: Handle) {
          profile(request:{handle: $handle}) {
            id
            name
            bio
            metadata
            handle
            picture {
              ... on NftImage {
                avatar: uri
              }
              ... on MediaSet {
                original {
                  avatar: url
                }
              }
            }
            ownedBy
          }
        }
        `,
          variables: {
            handle,
          },
        })
        .pipe(
          catchError(({ response }) => {
            console.log(response)
            if (response && response.status === 400 && response.data) {
              throw new HttpException({ message: response.data.errors[0].message }, 200)
            } else {
              throw new BadRequestException()
            }
          }),
        ),
    )

    const data = resp.data.data

    if (data.error) {
      this.logger.warn(`error for request lens: ${JSON.stringify(data.error)}`)
      throw new HttpException(data.error, 200)
    }

    if (!data.profile) {
      this.logger.warn(`cannot resolver handle: ${handle}`)
      throw new HttpException({ message: `cannot resolver the handle: \`${handle}\`` }, 200)
    }

    let avatar: string = data.profile?.picture?.avatar || data.profile?.picture?.original?.avatar

    avatar = avatar.startsWith('ipfs://') ? avatar.replace('ipfs://', this.configService.get('ipfs')) : avatar
    return { avatar }
  }
}
