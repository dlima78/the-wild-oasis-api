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
})
