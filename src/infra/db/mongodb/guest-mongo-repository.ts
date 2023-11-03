import { type LoadGuestsRepository, type AddGuestRepository, type LoadGuestByIdRepository, type UpdateGuestRepository, type DeleteGuestRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { type GuestModel } from '@/domain/models'
import { ObjectId } from 'mongodb'

export class GuestMongoRepository implements AddGuestRepository, LoadGuestsRepository, LoadGuestByIdRepository, UpdateGuestRepository, DeleteGuestRepository {
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

  async update (data: UpdateGuestRepository.Params): Promise<UpdateGuestRepository.Result> {
    const guestCollection = MongoHelper.getCollection('guests')
    const { guestId, ...dataWithoutId } = data
    const updatedGuest = await guestCollection.findOneAndUpdate(
      { _id: new ObjectId(guestId) },
      { $set: { ...dataWithoutId } },
      { returnDocument: 'after', upsert: false }
    )
    return MongoHelper.map(updatedGuest.value)
  }

  async delete (guestId: string): Promise<boolean> {
    const guestCollection = MongoHelper.getCollection('guests')
    const result = await guestCollection.deleteOne({ _id: new ObjectId(guestId) })
    return !!result.deletedCount
  }
}
