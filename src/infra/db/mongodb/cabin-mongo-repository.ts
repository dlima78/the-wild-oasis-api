import { type AddCabinRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class CabinMongoRepository implements AddCabinRepository {
  async add (data: AddCabinRepository.Params): Promise<void> {
    const cabinCollection = MongoHelper.getCollection('cabins')
    await cabinCollection.insertOne(data)
  }
}
