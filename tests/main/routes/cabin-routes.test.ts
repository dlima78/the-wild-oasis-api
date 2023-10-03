import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'

import { type Collection } from 'mongodb'
import request from 'supertest'

let cabinCollection: Collection

describe('Cabin', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    cabinCollection = MongoHelper.getCollection('cabins')
    await cabinCollection.deleteMany({})
  })
  test('should ', async () => {
    await request(app)
      .post('/api/cabin')
      .send({
        name: 'Cabin01',
        maxCapacity: 4,
        regularPrice: 30,
        discount: 5,
        description: ''
      })
      .expect(204)
  })
})
