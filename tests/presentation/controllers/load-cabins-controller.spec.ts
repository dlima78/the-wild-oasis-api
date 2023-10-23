import { LoadCabinsController } from '@/presentation/controllers'
import { LoadCabinsSpy } from '@/tests/presentation/mocks'

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
})
