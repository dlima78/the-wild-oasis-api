import { LoadCabinByIdRepositorySpy } from '@/tests/data/mock'
import { DbLoadCabinById } from '@/data/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  loadCabinByIdRepositorySpy: LoadCabinByIdRepositorySpy
  sut: DbLoadCabinById
}

const makeSut = (): SutTypes => {
  const loadCabinByIdRepositorySpy = new LoadCabinByIdRepositorySpy()
  const sut = new DbLoadCabinById(loadCabinByIdRepositorySpy)
  return {
    loadCabinByIdRepositorySpy,
    sut
  }
}

describe('DbLoadCabinById usecase', () => {
  test('should call LoadCabinByIdRepository with correct id', async () => {
    const { sut, loadCabinByIdRepositorySpy } = makeSut()
    const cabinId = faker.string.uuid()
    await sut.loadById(cabinId)
    expect(loadCabinByIdRepositorySpy.id).toBe(cabinId)
  })
})
