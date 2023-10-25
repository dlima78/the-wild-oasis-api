import {
  type LoadCabinsRepository,
  type SaveCabinRepository
} from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { ObjectId } from 'mongodb'

export class CabinMongoRepository
implements SaveCabinRepository, LoadCabinsRepository {
  async save (data: SaveCabinRepository.Params): Promise<void> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    await cabinCollection.findOneAndUpdate(
      {
        _id: new ObjectId(data.id)
      },
      {
        $set: {
          name: data.name,
          maxCapacity: data.maxCapacity,
          regularPrice: data.regularPrice,
          discount: data.discount,
          description: data.description,
          image: data.image
        }
      },
      {
        upsert: true
      }
    )
  }

  async loadAll (): Promise<LoadCabinsRepository.Result> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    const cabins = await cabinCollection.find({}).toArray()
    return MongoHelper.mapCollection(cabins)
  }
}
