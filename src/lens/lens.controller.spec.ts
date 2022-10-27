import { Test, TestingModule } from '@nestjs/testing'
import { LensController } from './lens.controller'

describe('LensController', () => {
  let controller: LensController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LensController],
    }).compile()

    controller = module.get<LensController>(LensController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
