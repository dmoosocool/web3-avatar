import { Test, TestingModule } from '@nestjs/testing'
import { CsbService } from './csb.service'

describe('CsbService', () => {
  let service: CsbService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsbService],
    }).compile()

    service = module.get<CsbService>(CsbService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
