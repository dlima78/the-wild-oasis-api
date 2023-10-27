import { LoadCabinByIdRepositorySpy } from '@/tests/data/mock'
import { DbLoadCabinById } from '@/data/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  loadCabinByIdRepositorySpy: LoadCabinByIdRepositorySpy
  sut: DbLoadCabinById
}

const makeSut = (): SutTypes => {
  const loadCabinByIdRepositorySpy = new LoadCabinByIdRepositorySpy()
  const sut = new DbLoadCabinById(loadCabinByIdRepositorySpy)
  return {
    loadCabinByIdRepositorySpy,
    sut
  }
}

const id = faker.string.uuid()

describe('DbLoadCabinById usecase', () => {
  test('should call LoadCabinByIdRepository with correct id', async () => {
    const { sut, loadCabinByIdRepositorySpy } = makeSut()
    const cabinId = id
    await sut.loadById(cabinId)
    expect(loadCabinByIdRepositorySpy.id).toBe(cabinId)
  })

  test('should throw if LoadCabinByIdThrows', async () => {
    const { sut, loadCabinByIdRepositorySpy } = makeSut()
    jest
      .spyOn(loadCabinByIdRepositorySpy, 'loadById')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.loadById(id)
    await expect(promise).rejects.toThrow()
  })

  test('should return a Cabin on success', async () => {
    const { sut, loadCabinByIdRepositorySpy } = makeSut()
    const cabin = await sut.loadById(id)
    expect(cabin).toEqual(loadCabinByIdRepositorySpy.result)
  })
})
