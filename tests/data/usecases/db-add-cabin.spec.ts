import { DbAddCabin } from '@/data/usecases'
import { type AddCabinRepository } from '@/data/protocols'
import { mockAddCabinParams } from '@/tests/domain/mocks'

export class AddCabinRepositorySpy implements AddCabinRepository {
  params: AddCabinRepository.Params = {
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: ''
  }

  async add (params: AddCabinRepository.Params): Promise<void> {
    this.params = params
  }
}

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

describe('DbAddCAbin', () => {
  test('should call AddCabinRepository with correct values', async () => {
    const { sut, addCabinRepositorySpy } = makeSut()
    const cabinData = mockAddCabinParams()
    await sut.add(cabinData)
    expect(addCabinRepositorySpy.params).toEqual(cabinData)
  })

  test('should throw if AddCabinRepository throws', async () => {
    const { sut, addCabinRepositorySpy } = makeSut()
    jest.spyOn(addCabinRepositorySpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddCabinParams())
    await expect(promise).rejects.toThrow()
  })
})
