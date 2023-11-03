import { UpdateGuestController } from '@/presentation/controllers'

import { faker } from '@faker-js/faker'
import { UpdateGuestSpy } from '@/tests/presentation/mocks'

const mockRequest = (): UpdateGuestController.Request => ({
  guestId: faker.string.uuid(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  nationality: faker.location.country(),
  countryFlag: faker.lorem.word(3),
  nationalId: faker.location.countryCode()
})

interface SutTypes {
  sut: UpdateGuestController
  updateGuestSpy: UpdateGuestSpy
}

const makeSut = (): SutTypes => {
  const updateGuestSpy = new UpdateGuestSpy()
  const sut = new UpdateGuestController(updateGuestSpy)
  return {
    sut,
    updateGuestSpy
  }
}

describe('Update Guest Controller', () => {
  test('Should call UpdateGuest with correct values', async () => {
    const { sut, updateGuestSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateGuestSpy.params).toEqual(request)
  })
})
