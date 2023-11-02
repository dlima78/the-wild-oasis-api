import { LoadGuestsController } from '@/presentation/controllers'
import { LoadGuestsSpy } from '@/tests/presentation/mocks'
import { noContent, ok } from '@/presentation/helpers'

type SutTypes = {
  loadGuestsSpy: LoadGuestsSpy
  sut: LoadGuestsController
}

const makeSut = (): SutTypes => {
  const loadGuestsSpy = new LoadGuestsSpy()
  const sut = new LoadGuestsController(loadGuestsSpy)
  return {
    sut,
    loadGuestsSpy
  }
}

describe('Load Guests Controller', () => {
  test('should return 200 on success', async () => {
    const { sut, loadGuestsSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadGuestsSpy.result))
  })

  test('should return 204 if LoadGuests returns empty', async () => {
    const { sut, loadGuestsSpy } = makeSut()
    loadGuestsSpy.result = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })
})
