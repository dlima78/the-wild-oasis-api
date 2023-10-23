import { LoadCabinsController } from '@/presentation/controllers'
import { LoadCabinsSpy } from '@/tests/presentation/mocks'
import { noContent, ok, serverError } from '@/presentation/helpers'

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

  test('should return 204 if LoadCabins returns empty', async () => {
    const { sut, loadCabinsSpy } = makeSut()
    loadCabinsSpy.result = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('should returs 500 if LoadCabins throws', async () => {
    const { sut, loadCabinsSpy } = makeSut()
    jest.spyOn(loadCabinsSpy, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
