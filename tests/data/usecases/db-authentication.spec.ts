import { DbAuthentication } from '@/data/usecases'
import { LoadAccoutByEmailRepositorySpy } from '@/tests/data/mock'
import { mockAuthenticationParams } from '@/tests/domain/mocks'
type SutTypes = {
  loadAccountByEmailRepositorySpy: LoadAccoutByEmailRepositorySpy
  sut: DbAuthentication
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccoutByEmailRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
  return {
    loadAccountByEmailRepositorySpy,
    sut
  }
}

describe('DbAuthentication Usecase', () => {
  test('should call LoadByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(
      authenticationParams.email
    )
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })
})
