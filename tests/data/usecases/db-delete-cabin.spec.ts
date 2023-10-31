import { DbDeleteCabin } from '@/data/usecases'
import { DeleteCabinRepositorySpy } from '@/tests/data/mock'
import { mockDeleteCabinParam } from '@/tests/domain/mocks'

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

describe('DbUpdateCabin', () => {
  test('should call DeleteCabinRepository with correct id', async () => {
    const { sut, deleteCabinRepositorySpy } = makeSut()
    const cabinId = mockDeleteCabinParam()
    await sut.delete(cabinId)
    expect(deleteCabinRepositorySpy.cabinId).toEqual(cabinId)
  })

  test('should return true if DeleteCabinRepository succeeds', async () => {
    const { sut } = makeSut()
    const isValid = await sut.delete(mockDeleteCabinParam())
    expect(isValid).toBe(true)
  })

  test('should return false if DeleteCabinRepository return false', async () => {
    const { sut, deleteCabinRepositorySpy } = makeSut()
    deleteCabinRepositorySpy.result = false
    const isValid = await sut.delete(mockDeleteCabinParam())
    expect(isValid).toBe(false)
  })

  test('should throw if DeleteCabinRepository throws', async () => {
    const { sut, deleteCabinRepositorySpy } = makeSut()
    jest.spyOn(deleteCabinRepositorySpy, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.delete(mockDeleteCabinParam())
    await expect(promise).rejects.toThrow()
  })
})
