import { LoadGuestController } from '@/presentation/controllers'
import { LoadGuestsSpy } from '@/tests/presentation/mocks'
import { ok } from '@/presentation/helpers'

type SutTypes = {
  loadGuestsSpy: LoadGuestsSpy
  sut: LoadGuestController
}

const makeSut = (): SutTypes => {
  const loadGuestsSpy = new LoadGuestsSpy()
  const sut = new LoadGuestController(loadGuestsSpy)
  return {
    sut,
    loadGuestsSpy
  }
}

describe('Add Guest Controller', () => {
  test('should return 200 on success', async () => {
    const { sut, loadGuestsSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadGuestsSpy.result))
  })
})
