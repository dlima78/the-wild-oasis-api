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
})
