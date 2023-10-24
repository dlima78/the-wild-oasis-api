import { CabinMongoRepository, MongoHelper } from '@/infra/db'
import { mockSaveCabinParams } from '@/tests/domain/mocks'
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
      await sut.save(mockSaveCabinParams())
      const count = await cabinCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('should load all cabins on success', async () => {
      const sut = makeSut()
      const saveCabinModels = [mockSaveCabinParams(), mockSaveCabinParams()]
      await cabinCollection.insertMany(saveCabinModels)
      const cabins = await sut.loadAll()
      expect(cabins.length).toBe(2)
      expect(cabins[0].id).toBeTruthy()
      expect(cabins[0].name).toBe(saveCabinModels[0].name)
      expect(cabins[0].maxCapacity).toBe(saveCabinModels[0].maxCapacity)
      expect(cabins[0].discount).toBe(saveCabinModels[0].discount)
      expect(cabins[0].description).toBe(saveCabinModels[0].description)
      expect(cabins[0].image).toBe(saveCabinModels[0].image)
      expect(cabins[1].id).toBeTruthy()
      expect(cabins[1].name).toBe(saveCabinModels[1].name)
      expect(cabins[1].maxCapacity).toBe(saveCabinModels[1].maxCapacity)
      expect(cabins[1].discount).toBe(saveCabinModels[1].discount)
      expect(cabins[1].description).toBe(saveCabinModels[1].description)
      expect(cabins[1].image).toBe(saveCabinModels[1].image)
    })
  })
})
