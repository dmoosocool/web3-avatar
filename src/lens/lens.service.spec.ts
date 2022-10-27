import { Test, TestingModule } from '@nestjs/testing'
import { LensService } from './lens.service'

describe('LensService', () => {
  let service: LensService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LensService],
    }).compile()

    service = module.get<LensService>(LensService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
