import { type LoadGuestsRepository, type AddGuestRepository, type LoadGuestByIdRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { type GuestModel } from '@/domain/models'
import { ObjectId } from 'mongodb'

export class GuestMongoRepository implements AddGuestRepository, LoadGuestsRepository, LoadGuestByIdRepository {
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

  async loadById (cabinId: string): Promise<GuestModel> {
    const guestCollection = MongoHelper.getCollection('guests')
    const guestModel = await guestCollection.findOne({ _id: new ObjectId(cabinId) })
    return MongoHelper.map(guestModel)
  }
}
