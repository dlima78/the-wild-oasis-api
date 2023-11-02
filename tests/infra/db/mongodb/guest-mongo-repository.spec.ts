import { GuestMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddGuestParams } from '@/tests/domain/mocks'
import { type Collection } from 'mongodb'

const makeSut = (): GuestMongoRepository => {
  return new GuestMongoRepository()
}

let guestCollection: Collection

describe('GuestMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    guestCollection = MongoHelper.getCollection('guests')
    await guestCollection.deleteMany({})
  })

  describe('add()', () => {
    test('should add cabin on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddGuestParams())
      const count = await guestCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('should load all guests on success', async () => {
      const addGuestModels = [mockAddGuestParams(), mockAddGuestParams()]
      await guestCollection.insertMany(addGuestModels)
      const sut = makeSut()
      const guests = await sut.loadAll()
      const count = await guestCollection.countDocuments()
      expect(count).toBe(2)
      expect(guests[0].countryFlag).toBe(addGuestModels[0].countryFlag)
      expect(guests[1].countryFlag).toBe(addGuestModels[1].countryFlag)
      expect(guests[0].email).toBe(addGuestModels[0].email)
      expect(guests[1].email).toBe(addGuestModels[1].email)
      expect(guests[0].fullName).toBe(addGuestModels[0].fullName)
      expect(guests[1].fullName).toBe(addGuestModels[1].fullName)
      expect(guests[0].nationalId).toBe(addGuestModels[0].nationalId)
      expect(guests[1].nationalId).toBe(addGuestModels[1].nationalId)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('should load guest by id on success', async () => {
      const addGuestModel = mockAddGuestParams()
      const res = await guestCollection.insertOne(addGuestModel)
      const sut = makeSut()
      const guest = await sut.loadById(res.insertedId.toHexString())
      expect(guest).toBeTruthy()
      expect(guest.id).toBeTruthy()
      expect(addGuestModel.countryFlag).toBe(guest.countryFlag)
      expect(addGuestModel.email).toBe(guest.email)
      expect(addGuestModel.fullName).toBe(guest.fullName)
      expect(addGuestModel.nationalId).toBe(guest.nationalId)
      expect(addGuestModel.nationality).toBe(guest.nationality)
    })
  })
})
