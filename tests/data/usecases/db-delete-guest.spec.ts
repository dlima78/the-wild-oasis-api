import { DbDeleteGuest } from '@/data/usecases'
import { DeleteGuestRepositorySpy } from '@/tests/data/mock'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: DbDeleteGuest
  deleteGuestRepositorySpy: DeleteGuestRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteGuestRepositorySpy = new DeleteGuestRepositorySpy()
  const sut = new DbDeleteGuest(deleteGuestRepositorySpy)
  return {
    deleteGuestRepositorySpy,
    sut
  }
}

const guestId = faker.string.uuid()

describe('DbUpdateGuest usecase', () => {
  test('should call DeleteGuestRepository with correct id', async () => {
    const { sut, deleteGuestRepositorySpy } = makeSut()
    await sut.delete(guestId)
    expect(deleteGuestRepositorySpy.guestId).toEqual(guestId)
  })

  test('should return true if DeleteGuestRepository succeeds', async () => {
    const { sut } = makeSut()
    const isValid = await sut.delete(guestId)
    expect(isValid).toBe(true)
  })

  test('should return false if DeleteGuestRepository return false', async () => {
    const { sut, deleteGuestRepositorySpy } = makeSut()
    deleteGuestRepositorySpy.result = false
    const isValid = await sut.delete(guestId)
    expect(isValid).toBe(false)
  })
})
