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

const guestId = faker.string.uuid()

describe('DbLoadGuests usecase', () => {
  test('should call LoadGuestByIdRepository with correct id', async () => {
    const { sut, loadGuestByIdRepositorySpy } = makeSut()
    await sut.load(guestId)
    expect(loadGuestByIdRepositorySpy.guestId).toBe(guestId)
  })

  test('should return a Guest on success', async () => {
    const { sut, loadGuestByIdRepositorySpy } = makeSut()
    const guest = await sut.load(guestId)
    expect(guest).toEqual(loadGuestByIdRepositorySpy.result)
  })

  test('should throw if LoadCabinByIdThrows', async () => {
    const { sut, loadGuestByIdRepositorySpy } = makeSut()
    jest
      .spyOn(loadGuestByIdRepositorySpy, 'loadById')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.load(guestId)
    await expect(promise).rejects.toThrow()
  })
})
