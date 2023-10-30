import { CabinMongoRepository, MongoHelper } from '@/infra/db'
import {
  mockAddCabinParams,
  mockSaveCabinParamsWithoutId
} from '@/tests/domain/mocks'
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

  describe('save()', () => {
    test('should add cabin if its new', async () => {
      const sut = makeSut()
      await sut.save(mockSaveCabinParamsWithoutId())
      const count = await cabinCollection.countDocuments()
      expect(count).toBe(1)
    })

    test('should update cabin if its not new', async () => {
      const cabin = mockSaveCabinParamsWithoutId()
      const result = await cabinCollection.insertOne({
        name: cabin.name,
        maxCapacity: cabin.maxCapacity,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        description: cabin.description,
        image: cabin.image
      })
      const cabinId = result.insertedId.toHexString()
      const sut = makeSut()
      await sut.save({
        id: cabinId,
        name: 'new name',
        maxCapacity: 3,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        description: 'A beautiful cabin',
        image: cabin.image
      })

      const cabinResult = await cabinCollection.find({}).toArray()

      const cabinUpdated = MongoHelper.mapCollection(cabinResult)

      expect(cabinResult).toBeTruthy()
      expect(cabinResult.length).toBe(1)
      expect(cabinUpdated[0].name).toBe('new name')
      expect(cabinUpdated[0].maxCapacity).toBe(3)
      expect(cabinUpdated[0].regularPrice).toBe(cabin.regularPrice)
      expect(cabinUpdated[0].discount).toBe(cabin.discount)
      expect(cabinUpdated[0].description).toBe('A beautiful cabin')
      expect(cabinUpdated[0].image).toBe(cabin.image)
    })
  })

  describe('loadAll()', () => {
    test('should load all cabins on success', async () => {
      const sut = makeSut()
      const saveCabinModels = [
        mockSaveCabinParamsWithoutId(),
        mockSaveCabinParamsWithoutId()
      ]
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

  describe('loadById', () => {
    test('should load a Cabin by id', async () => {
      const cabin = mockAddCabinParams()
      const res = await cabinCollection.insertOne(cabin)
      const cabinId = res.insertedId.toHexString()
      const sut = makeSut()
      const cabinResult = await sut.loadById(cabinId)
      expect(cabinResult).toBeTruthy()
      expect(cabinResult.name).toBe(cabin.name)
      expect(cabinResult.maxCapacity).toBe(cabin.maxCapacity)
      expect(cabinResult.description).toBe(cabin.description)
      expect(cabinResult.discount).toBe(cabin.discount)
      expect(cabinResult.id).toBe(cabinId)
      expect(cabinResult.image).toBe(cabin.image)
    })
  })
})
