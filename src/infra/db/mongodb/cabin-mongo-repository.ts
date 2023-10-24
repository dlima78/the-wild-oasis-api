import {
  type LoadCabinsRepository,
  type SaveCabinRepository
} from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class CabinMongoRepository
implements SaveCabinRepository, LoadCabinsRepository {
  async save (data: SaveCabinRepository.Params): Promise<void> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    await cabinCollection.insertOne(data)
  }

  async loadAll (): Promise<LoadCabinsRepository.Result> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    const cabins = await cabinCollection.find({}).toArray()
    return MongoHelper.mapCollection(cabins)
  }
}
