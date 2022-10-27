import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class EnsService {
  public prefix = 'https://metadata.ens.domains/mainnet/avatar/'
  constructor(private readonly httpService: HttpService) {}
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

    return {
      avatar: `${this.prefix}${handle}`,
    }
  }
}
