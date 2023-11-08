import { type AddBookingRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { ObjectId } from 'mongodb'

export class BookingMongoRepository implements AddBookingRepository {
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
}
