import { DeleteGuestController } from '@/presentation/controllers'
import { DeleteGuestSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { forbidden, noContent, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

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

  test('should return 403 if DeleteGuest returns false', async () => {
    const { sut, deleteGuestSpy } = makeSut()
    deleteGuestSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('guestId')))
  })

  test('should return 500 if DeleteGuest throws', async () => {
    const { sut, deleteGuestSpy } = makeSut()
    jest.spyOn(deleteGuestSpy, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
