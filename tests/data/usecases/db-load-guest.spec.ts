import { LoadGuestByIdRepositorySpy } from '@/tests/data/mock'
import { DbLoadGuest } from '@/data/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  loadGuestByIdRepositorySpy: LoadGuestByIdRepositorySpy
  sut: DbLoadGuest
}

const makeSut = (): SutTypes => {
  const loadGuestByIdRepositorySpy = new LoadGuestByIdRepositorySpy()
  const sut = new DbLoadGuest(loadGuestByIdRepositorySpy)
  return {
    loadGuestByIdRepositorySpy,
    sut
  }
}

const cabinId = faker.string.uuid()

describe('DbLoadGuests usecase', () => {
  test('should call LoadGuestByIdRepository with correct id', async () => {
    const { sut, loadGuestByIdRepositorySpy } = makeSut()
    await sut.load(cabinId)
    expect(loadGuestByIdRepositorySpy.cabinId).toBe(cabinId)
  })
})
