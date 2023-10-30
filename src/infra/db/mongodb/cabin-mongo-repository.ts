import {
  type LoadCabinByIdRepository,
  type AddCabinRepository,
  type LoadCabinsRepository,
  type SaveCabinRepository
} from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { ObjectId } from 'mongodb'

export class CabinMongoRepository
implements
    AddCabinRepository,
    SaveCabinRepository,
    LoadCabinsRepository,
    LoadCabinByIdRepository {
  async add (data: AddCabinRepository.Params): Promise<boolean> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    const result = await cabinCollection.insertOne(data)
    return result !== null
  }

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

  async loadById (id: string): Promise<LoadCabinByIdRepository.Result> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    const cabin = await cabinCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.map(cabin)
  }
}
