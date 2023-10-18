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
    await sut.loadByToken(token)
    expect(decrypterSpy.cyphertext).toBe(token)
  })

  test('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.loadByToken(token)
    expect(account).toBeNull()
  })

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.loadByToken(token, role)
    expect(loadAccountByTokenRepositorySpy.token).toBe(token)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  test('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const account = await sut.loadByToken(token, role)
    expect(account).toBeNull()
  })

  test('Should return null if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const account = await sut.loadByToken(token, role)
    expect(account).toBeNull()
  })
})
