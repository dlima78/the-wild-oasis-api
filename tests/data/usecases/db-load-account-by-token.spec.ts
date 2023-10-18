import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy } from '@/tests/data/mock'
import { faker } from '@faker-js/faker'

type SutTypes = {
  decrypterSpy: DecrypterSpy
  sut: DbLoadAccountByToken
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy)
  return {
    decrypterSpy,
    sut
  }
}

let token: string

describe('DbLoadAccountByToken', () => {
  beforeEach(() => {
    token = faker.string.uuid()
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
})
