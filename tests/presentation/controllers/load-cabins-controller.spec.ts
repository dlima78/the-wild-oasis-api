import { LoadCabinsController } from '@/presentation/controllers'
import { LoadCabinsSpy } from '@/tests/presentation/mocks'
import { ok } from '@/presentation/helpers'

type SutTypes = {
  loadCabinsSpy: LoadCabinsSpy
  sut: LoadCabinsController
}

const makeSut = (): SutTypes => {
  const loadCabinsSpy = new LoadCabinsSpy()
  const sut = new LoadCabinsController(loadCabinsSpy)
  return {
    loadCabinsSpy,
    sut
  }
}

describe('LoadCabins controller', () => {
  test('should call LoadCabins', async () => {
    const { sut, loadCabinsSpy } = makeSut()
    const cabinSpy = jest.spyOn(loadCabinsSpy, 'load')
    await sut.handle()
    expect(cabinSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut, loadCabinsSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadCabinsSpy.result))
  })
})
