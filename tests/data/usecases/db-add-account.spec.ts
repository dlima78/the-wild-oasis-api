import { DbAddAccount } from '@/data/usecases'
import { HasherSpy } from '@/tests/data/mock/mock-cryptography'
import { mockAddAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  hasherSpy: HasherSpy
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const sut = new DbAddAccount(hasherSpy)
  return {
    hasherSpy,
    sut
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toEqual(addAccountParams.password)
  })
})
