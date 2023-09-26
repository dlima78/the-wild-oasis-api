import { CabinMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddCabinParams } from '@/tests/domain/mocks'
import { type Collection } from 'mongodb'

const makeSut = (): CabinMongoRepository => {
  return new CabinMongoRepository()
}

let cabinCollection: Collection

describe('CabinMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    cabinCollection = MongoHelper.getCollection('cabins')
    await cabinCollection.deleteMany({})
  })
  describe('add()', () => {
    test('should add cabin on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCabinParams())
      const count = await cabinCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
