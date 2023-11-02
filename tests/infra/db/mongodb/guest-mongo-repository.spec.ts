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
  })
})
