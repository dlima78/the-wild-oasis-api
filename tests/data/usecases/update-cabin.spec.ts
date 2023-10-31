import { DbUpdateCabin } from '@/data/usecases'
import { mockUpdateCabinParams } from '@/tests/domain/mocks'
import { UpdateCabinRepositorySpy } from '@/tests/data/mock'

interface SutTypes {
  sut: DbUpdateCabin
  updateCabinRepositorySpy: UpdateCabinRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCabinRepositorySpy = new UpdateCabinRepositorySpy()
  const sut = new DbUpdateCabin(updateCabinRepositorySpy)
  return {
    updateCabinRepositorySpy,
    sut
  }
}

describe('DbUpdateCabin', () => {
  test('should call UpdateCabinRepository with correct values', async () => {
    const { sut, updateCabinRepositorySpy } = makeSut()
    const cabinData = mockUpdateCabinParams()
    await sut.update(cabinData)
    expect(updateCabinRepositorySpy.data).toEqual(cabinData)
  })

  test('should throw if UpdateCabinRepository throws', async () => {
    const { sut, updateCabinRepositorySpy } = makeSut()
    jest.spyOn(updateCabinRepositorySpy, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateCabinParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return UpdateResult on success', async () => {
    const { sut, updateCabinRepositorySpy } = makeSut()
    const updateResult = await sut.update(mockUpdateCabinParams())
    expect(updateResult).toEqual(updateCabinRepositorySpy.result)
  })
})
