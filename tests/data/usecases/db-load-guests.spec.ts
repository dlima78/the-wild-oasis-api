import { LoadGuestsRepositorySpy } from '@/tests/data/mock'
import { DbLoadGuests } from '@/data/usecases'

type SutTypes = {
  loadGuestsRepositorySpy: LoadGuestsRepositorySpy
  sut: DbLoadGuests
}

const makeSut = (): SutTypes => {
  const loadGuestsRepositorySpy = new LoadGuestsRepositorySpy()
  const sut = new DbLoadGuests(loadGuestsRepositorySpy)
  return {
    loadGuestsRepositorySpy,
    sut
  }
}

describe('DbLoadGuests usecase', () => {
  test('should call LoadCabinsRepository', async () => {
    const { sut, loadGuestsRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadGuestsRepositorySpy, 'loadAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })
})
