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

  describe('loadById', () => {
    test('should load a Booking by id', async () => {
      const booking = mockAddBookingParams()
      const res = await bookingCollection.insertOne(booking)
      const bookingId = res.insertedId.toHexString()
      const sut = makeSut()
      const bookingResult = await sut.loadById(bookingId)
      expect(bookingResult).toBeTruthy()
      expect(bookingResult.id).toBe(bookingId)
      expect(bookingResult.cabinId).toBe(booking.cabinId)
      expect(bookingResult.cabinPrice).toBe(booking.cabinPrice)
      expect(bookingResult.startDate).toStrictEqual(booking.startDate)
      expect(bookingResult.endDate).toStrictEqual(booking.endDate)
      expect(bookingResult.extraPrice).toBe(booking.extraPrice)
      expect(bookingResult.hasBreakfast).toBe(booking.hasBreakfast)
      expect(bookingResult.isPaid).toBe(booking.isPaid)
      expect(bookingResult.mumGuest).toBe(booking.mumGuest)
      expect(bookingResult.numNight).toBe(booking.numNight)
      expect(bookingResult.observations).toBe(booking.observations)
      expect(bookingResult.status).toBe(booking.status)
      expect(bookingResult.totalPrice).toBe(booking.totalPrice)
      expect(bookingResult.userId).toBe(booking.userId)
    })
  })
})
