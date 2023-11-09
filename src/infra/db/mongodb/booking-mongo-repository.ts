import { type LoadBookingByIdRepository, type AddBookingRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { ObjectId } from 'mongodb'

export class BookingMongoRepository implements AddBookingRepository, LoadBookingByIdRepository {
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
}
