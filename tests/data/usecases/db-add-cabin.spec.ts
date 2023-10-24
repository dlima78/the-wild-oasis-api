import { DbSaveCabin } from '@/data/usecases'
import { type SaveCabinRepository } from '@/data/protocols'
import { mockSaveCabinParams } from '@/tests/domain/mocks'

export class SaveCabinRepositorySpy implements SaveCabinRepository {
  params: SaveCabinRepository.Params = {
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: ''
  }

  async save (params: SaveCabinRepository.Params): Promise<void> {
    this.params = params
  }
}

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
    const cabinData = mockSaveCabinParams()
    await sut.save(cabinData)
    expect(saveCabinRepositorySpy.params).toEqual(cabinData)
  })

  test('should throw if SaveCabinRepository throws', async () => {
    const { sut, saveCabinRepositorySpy } = makeSut()
    jest.spyOn(saveCabinRepositorySpy, 'save').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.save(mockSaveCabinParams())
    await expect(promise).rejects.toThrow()
  })
})
