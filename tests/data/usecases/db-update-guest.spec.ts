import { DbUpdateGuest } from '@/data/usecases'
import { mockUpdateGuestParams } from '@/tests/domain/mocks'
import {
  UpdateGuestRepositorySpy
} from '@/tests/data/mock'

type SutTypes = {
  updateGuestRepositorySpy: UpdateGuestRepositorySpy
  sut: DbUpdateGuest
}

const makeSut = (): SutTypes => {
  const updateGuestRepositorySpy = new UpdateGuestRepositorySpy()
  const sut = new DbUpdateGuest(
    updateGuestRepositorySpy
  )
  return {
    updateGuestRepositorySpy,
    sut
  }
}

describe('DbUpdateAccount Usecase', () => {
  test('should call UpdateGuestRepository with correct values', async () => {
    const { sut, updateGuestRepositorySpy } = makeSut()
    const updateGuestParams = mockUpdateGuestParams()
    await sut.update(updateGuestParams)
    expect(updateGuestRepositorySpy.data).toEqual(updateGuestParams)
  })

  test('should throw if UpdateGuestRepository throws', async () => {
    const { sut, updateGuestRepositorySpy } = makeSut()
    jest.spyOn(updateGuestRepositorySpy, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateGuestParams())
    await expect(promise).rejects.toThrow()
  })

  test('should returns a UpdateResult on success', async () => {
    const { sut, updateGuestRepositorySpy } = makeSut()
    const updateResult = await sut.update(mockUpdateGuestParams())
    expect(updateResult).toEqual(updateGuestRepositorySpy.result)
  })
})
