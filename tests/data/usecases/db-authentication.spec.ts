import { DbAuthentication } from '@/data/usecases'
import {
  EncrypterSpy,
  HashComparerSpy,
  LoadAccoutByEmailRepositorySpy,
  UpdateAccessTokenRepositorySpy
} from '@/tests/data/mock'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

type SutTypes = {
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccoutByEmailRepositorySpy
  encrypterSpy: EncrypterSpy
  hashComparerSpy: HashComparerSpy
  sut: DbAuthentication
}

const makeSut = (): SutTypes => {
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const loadAccountByEmailRepositorySpy = new LoadAccoutByEmailRepositorySpy()
  const encrypterSpy = new EncrypterSpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy,
    hashComparerSpy
  )
  return {
    updateAccessTokenRepositorySpy,
    encrypterSpy,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
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

  test('should call HashComparer with correct values', async () => {
    const { sut, loadAccountByEmailRepositorySpy, hashComparerSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(
      loadAccountByEmailRepositorySpy.result?.password
    )
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

  test('should calls UpdateAccessTokenRepository with correct values', async () => {
    const {
      sut,
      encrypterSpy,
      loadAccountByEmailRepositorySpy,
      updateAccessTokenRepositorySpy
    } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(updateAccessTokenRepositorySpy.id).toBe(
      loadAccountByEmailRepositorySpy.result?.id
    )
    expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.ciphertext)
  })
})
