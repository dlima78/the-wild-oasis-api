import { type LoadGuestsRepository, type AddGuestRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class GuestMongoRepository implements AddGuestRepository, LoadGuestsRepository {
  async add (data: AddGuestRepository.Params): Promise<boolean> {
    const guestCollection = MongoHelper.getCollection('guests')
    const result = await guestCollection.insertOne(data)
    return result !== null
  }

  async loadAll (): Promise<LoadGuestsRepository.Result> {
    const guestCollection = MongoHelper.getCollection('guests')
    const guestsModel = await guestCollection.find({}).toArray()
    return MongoHelper.mapCollection(guestsModel)
  }
}
