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

  describe('loadAll()', () => {
    test('should load all cabins on success', async () => {
      const sut = makeSut()
      const saveCabinModels = [mockAddCabinParams(), mockAddCabinParams()]
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

  describe('update()', () => {
    test('should update Cabin', async () => {
      const cabin = mockAddCabinParams()
      const res = await cabinCollection.insertOne(cabin)
      const cabinId = res.insertedId.toHexString()
      const sut = makeSut()
      const updatedCabin = await sut.update({
        cabinId,
        name: 'any_cabin',
        maxCapacity: 45,
        regularPrice: 100,
        discount: cabin.discount,
        description: cabin.description,
        image: cabin.image
      })

      expect(updatedCabin).toBeTruthy()
      expect(updatedCabin.name).toBe('any_cabin')
      expect(updatedCabin.maxCapacity).toBe(45)
      expect(updatedCabin.regularPrice).toBe(100)
      expect(updatedCabin.discount).toBe(cabin.discount)
      expect(updatedCabin.description).toBe(cabin.description)
      expect(updatedCabin.image).toBe(cabin.image)
    })
  })
})
