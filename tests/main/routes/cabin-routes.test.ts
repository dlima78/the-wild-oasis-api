import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'

import { type Collection } from 'mongodb'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { mockSaveCabinParamsWithoutId } from '@/tests/domain/mocks'

let cabinCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Eduardo',
    email: 'email@mail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId.toHexString()
  const accessToken = jwt.sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    {
      _id: res.insertedId
    },
    {
      $set: {
        accessToken
      }
    }
  )
  return accessToken
}

describe('Cabin Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    cabinCollection = MongoHelper.getCollection('cabins')
    await cabinCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT/cabin', () => {
    test('should return 403 on save cabin', async () => {
      await request(app)
        .put('/api/cabin')
        .send({
          name: 'Cabin01',
          maxCapacity: 4,
          regularPrice: 30,
          discount: 5,
          description: 'A Cabin'
        })
        .expect(403)
    })

    test('should return 204 on save cabin with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .put('/api/cabin')
        .set('x-access-token', accessToken)
        .send({
          name: 'Cabin01',
          maxCapacity: 4,
          regularPrice: 30,
          discount: 5,
          description: 'A Cabin'
        })
        .expect(204)
    })
  })

  describe('GET/cabins', () => {
    test('should return 403 on load cabins without accessToken', async () => {
      await request(app).get('/api/cabins').expect(403)
    })

    test('Should return 200 on load cabins with valid accessToken', async () => {
      await cabinCollection.insertMany([
        mockSaveCabinParamsWithoutId(),
        mockSaveCabinParamsWithoutId()
      ])
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/cabins')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 on load cabins with valid accessToken ', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/cabins')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
