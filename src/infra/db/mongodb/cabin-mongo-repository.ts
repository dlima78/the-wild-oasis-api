import {
  type LoadCabinByIdRepository,
  type AddCabinRepository,
  type LoadCabinsRepository,
  type UpdateCabinRepository
} from '@/data/protocols'
import { MongoHelper } from './mongo-helper'
import { ObjectId } from 'mongodb'

export class CabinMongoRepository
implements
    AddCabinRepository,
    LoadCabinsRepository,
    LoadCabinByIdRepository,
    UpdateCabinRepository {
  async add (data: AddCabinRepository.Params): Promise<boolean> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    const result = await cabinCollection.insertOne(data)
    return result !== null
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

  async update (
    data: UpdateCabinRepository.Params
  ): Promise<UpdateCabinRepository.Result> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    const { cabinId, ...dataWithoutId } = data
    const updatedCabin = await cabinCollection.findOneAndUpdate(
      { _id: new ObjectId(data.cabinId) },
      { $set: { ...dataWithoutId } },
      { returnDocument: 'after', upsert: false }
    )
    return MongoHelper.map(updatedCabin.value)
  }
}
