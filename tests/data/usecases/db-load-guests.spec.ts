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

  test('should return a list of guests on success', async () => {
    const { sut, loadGuestsRepositorySpy } = makeSut()
    const guests = await sut.load()
    expect(guests).toEqual(loadGuestsRepositorySpy.result)
  })

  test('should throw if LoadGuestsRepository throws', async () => {
    const { sut, loadGuestsRepositorySpy } = makeSut()
    jest
      .spyOn(loadGuestsRepositorySpy, 'loadAll')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
