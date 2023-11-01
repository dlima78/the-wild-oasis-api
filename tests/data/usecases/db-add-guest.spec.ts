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
})
