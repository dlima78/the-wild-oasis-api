import { DbDeleteCabin } from '@/data/usecases'
import { DeleteCabinRepositorySpy } from '@/tests/data/mock'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: DbDeleteCabin
  deleteCabinRepositorySpy: DeleteCabinRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteCabinRepositorySpy = new DeleteCabinRepositorySpy()
  const sut = new DbDeleteCabin(deleteCabinRepositorySpy)
  return {
    deleteCabinRepositorySpy,
    sut
  }
}

const cabinId = faker.string.uuid()

describe('DbUpdateCabin', () => {
  test('should call DeleteCabinRepository with correct id', async () => {
    const { sut, deleteCabinRepositorySpy } = makeSut()
    await sut.delete(cabinId)
    expect(deleteCabinRepositorySpy.cabinId).toEqual(cabinId)
  })

  test('should return true if DeleteCabinRepository succeeds', async () => {
    const { sut } = makeSut()
    const isValid = await sut.delete(cabinId)
    expect(isValid).toBe(true)
  })

  test('should return false if DeleteCabinRepository return false', async () => {
    const { sut, deleteCabinRepositorySpy } = makeSut()
    deleteCabinRepositorySpy.result = false
    const isValid = await sut.delete(cabinId)
    expect(isValid).toBe(false)
  })

  test('should throw if DeleteCabinRepository throws', async () => {
    const { sut, deleteCabinRepositorySpy } = makeSut()
    jest.spyOn(deleteCabinRepositorySpy, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.delete(cabinId)
    await expect(promise).rejects.toThrow()
  })
})
