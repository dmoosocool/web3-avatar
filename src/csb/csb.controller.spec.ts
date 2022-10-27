import { Test, TestingModule } from '@nestjs/testing'
import { CsbController } from './csb.controller'

describe('CsbController', () => {
  let controller: CsbController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsbController],
    }).compile()

    controller = module.get<CsbController>(CsbController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
