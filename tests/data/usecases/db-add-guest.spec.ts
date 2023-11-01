import { DbAddGuest } from '@/data/usecases'
import { mockAddGuestParams } from '@/tests/domain/mocks'
import {
  AddGuestRepositorySpy
} from '@/tests/data/mock'

type SutTypes = {
  addGuestRepositorySpy: AddGuestRepositorySpy
  sut: DbAddGuest
}

const makeSut = (): SutTypes => {
  const addGuestRepositorySpy = new AddGuestRepositorySpy()
  const sut = new DbAddGuest(
    addGuestRepositorySpy
  )
  return {
    addGuestRepositorySpy,
    sut
  }
}

describe('DbAddAccount Usecase', () => {
  test('should call AddGuestRepository with correct values', async () => {
    const { sut, addGuestRepositorySpy } = makeSut()
    const addGuestParams = mockAddGuestParams()
    await sut.add(addGuestParams)
    expect(addGuestRepositorySpy.guestData).toEqual(addGuestParams)
  })

  test('should return false if AddGuestRepository returns false', async () => {
    const { sut, addGuestRepositorySpy } = makeSut()
    addGuestRepositorySpy.result = false
    const isValid = await sut.add(mockAddGuestParams())
    expect(isValid).toBe(false)
  })

  test('should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddGuestParams())
    expect(isValid).toBe(true)
  })

  test('should throw if AddGuestRepository throws', async () => {
    const { sut, addGuestRepositorySpy } = makeSut()
    jest.spyOn(addGuestRepositorySpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddGuestParams())
    await expect(promise).rejects.toThrow()
  })
})
