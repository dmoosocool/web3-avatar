import { Test, TestingModule } from '@nestjs/testing'
import { EnsController } from './ens.controller'

describe('EnsController', () => {
  let controller: EnsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnsController],
    }).compile()

    controller = module.get<EnsController>(EnsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
