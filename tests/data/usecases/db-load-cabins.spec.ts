import { LoadCabinsRepositorySpy } from '@/tests/data/mock'
import { DbLoadCabins } from '@/data/usecases'

type SutTypes = {
  loadCabinsRepositorySpy: LoadCabinsRepositorySpy
  sut: DbLoadCabins
}

const makeSut = (): SutTypes => {
  const loadCabinsRepositorySpy = new LoadCabinsRepositorySpy()
  const sut = new DbLoadCabins(loadCabinsRepositorySpy)
  return {
    loadCabinsRepositorySpy,
    sut
  }
}

describe('DbLoadCabins usecase', () => {
  test('should call LoadCabinsRepository', async () => {
    const { sut, loadCabinsRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadCabinsRepositorySpy, 'loadAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })
})
