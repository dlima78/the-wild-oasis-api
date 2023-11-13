import { type LoadBookingByIdRepository, type AddBookingRepository, type LoadBookingsRepository, type UpdateBookingRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { ObjectId } from 'mongodb'

export class BookingMongoRepository implements AddBookingRepository, LoadBookingByIdRepository, LoadBookingsRepository, UpdateBookingRepository {
  async add (data: AddBookingRepository.Params): Promise<boolean> {
    const bookingCollection = MongoHelper.getCollection('bookings')
    const { cabinId, userId, ...rest } = data
    const bookingResult = await bookingCollection.insertOne({
      cabinId: new ObjectId(cabinId),
      userId: new ObjectId(userId),
      ...rest
    })
    return bookingResult !== null
  }

  async loadById (id: string): Promise<LoadBookingByIdRepository.Result> {
    const bookingCollection = MongoHelper.getCollection('bookings')
    const booking = await bookingCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.map(booking)
  }

  async loadAll (): Promise<LoadBookingsRepository.Result> {
    const bookingCollection = MongoHelper.getCollection('bookings')
    const bookingsResult = await bookingCollection.find({}).toArray()
    return MongoHelper.mapCollection(bookingsResult)
  }

  async update (
    data: UpdateBookingRepository.Params
  ): Promise<UpdateBookingRepository.Result> {
    const bookingCollection = MongoHelper.getCollection('bookings')
    const { bookingId, ...dataWithoutId } = data
    const updatedBooking = await bookingCollection.findOneAndUpdate(
      { _id: new ObjectId(bookingId) },
      { $set: { ...dataWithoutId } },
      { returnDocument: 'after', upsert: false }
    )
    return MongoHelper.map(updatedBooking.value)
  }
}
