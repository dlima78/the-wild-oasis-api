import { AuthMiddleware } from '@/presentation/middlewares'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'

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
})
