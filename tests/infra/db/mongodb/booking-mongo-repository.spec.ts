import { BookingMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddBookingParams, mockAddCabinParams, mockAddGuestParams } from '@/tests/domain/mocks'
import { ObjectId, type Collection } from 'mongodb'

let bookingCollection: Collection
let cabinCollection: Collection
let guestCollection: Collection

const makeSut = (): BookingMongoRepository => {
  return new BookingMongoRepository()
}

const mockCabin = async (): Promise<string> => {
  const res = await cabinCollection.insertOne(mockAddCabinParams())
  return res.insertedId.toHexString()
}

const mockGuest = async (): Promise<string> => {
  const res = await guestCollection.insertOne(mockAddGuestParams())
  return res.insertedId.toHexString()
}

describe('BookingMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    bookingCollection = MongoHelper.getCollection('bookings')
    await bookingCollection.deleteMany({})
    cabinCollection = MongoHelper.getCollection('cabins')
    await cabinCollection.deleteMany({})
    guestCollection = MongoHelper.getCollection('guests')
    await guestCollection.deleteMany({})
  })

  describe('add()', () => {
    test('should add booking on success', async () => {
      const mockCabinId = await mockCabin()
      const guestId = await mockGuest()
      const sut = makeSut()
      const { cabinId, userId, ...rest } = mockAddBookingParams()
      await sut.add({
        cabinId: mockCabinId,
        userId: guestId,
        ...rest
      })
      const bookingResult = await bookingCollection.findOne({
        cabinId: new ObjectId(mockCabinId),
        userId: new ObjectId(guestId)
      })

      expect(bookingResult).toBeTruthy()
      const count = await bookingCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
