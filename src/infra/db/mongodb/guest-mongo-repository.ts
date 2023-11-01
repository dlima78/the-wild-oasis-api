import { type AddGuestRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class GuestMongoRepository implements AddGuestRepository {
  async add (data: AddGuestRepository.Params): Promise<boolean> {
    const guestCollection = MongoHelper.getCollection('guests')
    const result = await guestCollection.insertOne(data)
    return result !== null
  }
}
