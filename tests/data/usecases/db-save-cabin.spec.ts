import { DbSaveCabin } from '@/data/usecases'
import {
  mockSaveCabinParamsWithId,
  mockSaveCabinParamsWithoutId
} from '@/tests/domain/mocks'
import { SaveCabinRepositorySpy } from '@/tests/data/mock'

interface SutTypes {
  sut: DbSaveCabin
  saveCabinRepositorySpy: SaveCabinRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveCabinRepositorySpy = new SaveCabinRepositorySpy()
  const sut = new DbSaveCabin(saveCabinRepositorySpy)
  return {
    saveCabinRepositorySpy,
    sut
  }
}

describe('DbSaveCabin', () => {
  test('should call SaveCabinRepository with correct values', async () => {
    const { sut, saveCabinRepositorySpy } = makeSut()
    const cabinData = mockSaveCabinParamsWithoutId()
    await sut.save(cabinData)
    expect(saveCabinRepositorySpy.data).toEqual(cabinData)
  })

  test('should throw if SaveCabinRepository throws', async () => {
    const { sut, saveCabinRepositorySpy } = makeSut()
    jest.spyOn(saveCabinRepositorySpy, 'save').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.save(mockSaveCabinParamsWithId())
    await expect(promise).rejects.toThrow()
  })
})
