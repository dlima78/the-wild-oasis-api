import {
  type LoadCabinsRepository,
  type AddCabinRepository
} from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class CabinMongoRepository
implements AddCabinRepository, LoadCabinsRepository {
  async add (data: AddCabinRepository.Params): Promise<void> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    await cabinCollection.insertOne(data)
  }

  async loadAll (): Promise<LoadCabinsRepository.Result> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    const cabins = await cabinCollection.find({}).toArray()
    return MongoHelper.mapCollection(cabins)
  }
}
