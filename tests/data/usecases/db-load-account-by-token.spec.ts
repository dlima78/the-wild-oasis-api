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

describe('DbLoadAccountByToken', () => {
  test('should call Decrypter with correct cyphertext', async () => {
    const token = faker.string.uuid()
    const { sut, decrypterSpy } = makeSut()
    await sut.loadByToken(token)
    expect(decrypterSpy.cyphertext).toBe(token)
  })
})
