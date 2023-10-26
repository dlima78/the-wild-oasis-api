import { DbAddCabin } from '@/data/usecases'
import { mockAddCabinParams } from '@/tests/domain/mocks'
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
    const cabinData = mockAddCabinParams()
    await sut.add(cabinData)
    expect(addCabinRepositorySpy.data).toEqual(cabinData)
  })

  test('should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddCabinParams())
    expect(isValid).toBe(true)
  })

  test('should return false if AddCabinRepository returns false', async () => {
    const { sut, addCabinRepositorySpy } = makeSut()
    addCabinRepositorySpy.result = false
    const isValid = await sut.add(mockAddCabinParams())
    expect(isValid).toBe(false)
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
