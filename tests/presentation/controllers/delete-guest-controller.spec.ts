import { DeleteGuestController } from '@/presentation/controllers'
import { DeleteGuestSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  deleteGuestSpy: DeleteGuestSpy
  sut: DeleteGuestController
}

const makeSut = (): SutTypes => {
  const deleteGuestSpy = new DeleteGuestSpy()
  const sut = new DeleteGuestController(deleteGuestSpy)
  return {
    deleteGuestSpy,
    sut
  }
}

const mockRequest = (): DeleteGuestController.Request => ({
  guestId: faker.string.uuid()
})

describe('DeleteGuest controller', () => {
  test('should call DeleteGuest with correct id', async () => {
    const { sut, deleteGuestSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteGuestSpy.guestId).toEqual(request.guestId)
  })
})
