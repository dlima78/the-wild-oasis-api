import { AuthMiddleware } from '@/presentation/middlewares'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'
import { forbidden } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token'
})

type SutTypes = {
  loadAccountByTokenSpy: LoadAccountByTokenSpy
  sut: AuthMiddleware
}

const makeSut = (role?: string | undefined): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return { sut, loadAccountByTokenSpy }
}

describe('AuthMiddleware', () => {
  test('should call loadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.accessToken)
  })

  test('should return 403 if loadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
