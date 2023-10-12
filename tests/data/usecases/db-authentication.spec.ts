import { DbAuthentication } from '@/data/usecases'
import { EncrypterSpy, LoadAccoutByEmailRepositorySpy } from '@/tests/data/mock'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

type SutTypes = {
  loadAccountByEmailRepositorySpy: LoadAccoutByEmailRepositorySpy
  encrypterSpy: EncrypterSpy
  sut: DbAuthentication
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccoutByEmailRepositorySpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    encrypterSpy
  )
  return {
    encrypterSpy,
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

  test('should call Encrypter with correct plaintext', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(encrypterSpy.plaintext).toBe(
      loadAccountByEmailRepositorySpy.result?.id
    )
  })

  test('should throws if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return an account data on success', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const data = await sut.auth(mockAuthenticationParams())
    expect(data?.accessToken).toBe(encrypterSpy.ciphertext)
    expect(data?.name).toBe(loadAccountByEmailRepositorySpy.result?.name)
  })
})
