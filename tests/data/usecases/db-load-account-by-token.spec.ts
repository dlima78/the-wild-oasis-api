import { DbLoadAccountByToken } from '@/data/usecases'
import {
  DecrypterSpy,
  LoadAccountByTokenRepositorySpy
} from '@/tests/data/mock'
import { faker } from '@faker-js/faker'

type SutTypes = {
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
  decrypterSpy: DecrypterSpy
  sut: DbLoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  )
  return {
    loadAccountByTokenRepositorySpy,
    decrypterSpy,
    sut
  }
}

let token: string
let role: string

describe('DbLoadAccountByToken', () => {
  beforeEach(() => {
    token = faker.string.uuid()
    role = faker.lorem.word()
  })
  test('should call Decrypter with correct cyphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token)
    expect(decrypterSpy.cyphertext).toBe(token)
  })

  test('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.load(token)
    expect(account).toBeNull()
  })

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load(token, role)
    expect(loadAccountByTokenRepositorySpy.token).toBe(token)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  test('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load(token, role)
    expect(account).toEqual(loadAccountByTokenRepositorySpy.result)
  })

  test('Should return null if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('should throws if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest
      .spyOn(loadAccountByTokenRepositorySpy, 'loadByToken')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })
})
