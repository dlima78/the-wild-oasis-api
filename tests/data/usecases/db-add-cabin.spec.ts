import { DbAddCabin } from '@/data/usecases'
import { mockSaveCabinParams } from '@/tests/domain/mocks'
import { AddCabinRepositorySpy } from '@/tests/data/mock'

interface SutTypes {
  sut: DbAddCabin
  addCabinRepositorySpy: AddCabinRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCabinRepositorySpy = new AddCabinRepositorySpy()
  const sut = new DbAddCabin(addCabinRepositorySpy)
  return {
    addCabinRepositorySpy,
    sut
  }
}

describe('DbAddCabin', () => {
  test('should call AddCabinRepository with correct values', async () => {
    const { sut, addCabinRepositorySpy } = makeSut()
    const cabinData = mockSaveCabinParams()
    await sut.add(cabinData)
    expect(addCabinRepositorySpy.data).toEqual(cabinData)
  })

  test('should throw if AddCabinRepository throws', async () => {
    const { sut, addCabinRepositorySpy } = makeSut()
    jest.spyOn(addCabinRepositorySpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockSaveCabinParams())
    await expect(promise).rejects.toThrow()
  })
})
