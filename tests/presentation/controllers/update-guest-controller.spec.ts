import { UpdateGuestController } from '@/presentation/controllers'

import { faker } from '@faker-js/faker'
import { UpdateGuestSpy } from '@/tests/presentation/mocks'
import { ok, serverError } from '@/presentation/helpers'

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

  test('Should returns 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(httpResponse.body))
  })

  test('Should return 500 if UpdateGuest throws', async () => {
    const { sut, updateGuestSpy } = makeSut()
    jest.spyOn(updateGuestSpy, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
