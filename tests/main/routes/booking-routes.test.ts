import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'

import { type Collection } from 'mongodb'
import request from 'supertest'
import jwt from 'jsonwebtoken'

let bookingCollection: Collection
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

describe('Booking Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    bookingCollection = MongoHelper.getCollection('bookings')
    await bookingCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST/booking', () => {
    test('should return 403 on add booking', async () => {
      await request(app)
        .post('/api/booking')
        .send({
          startDate: '2021-12-14T12:26:49.021+00:00',
          endDate: '2021-12-09T20:37:47.587+00:00',
          numNight: 5,
          mumGuest: 8,
          cabinPrice: 1500.00,
          extraPrice: 500.00,
          totalPrice: 2000.00,
          status: 'apto',
          hasBreakfast: true,
          isPaid: true,
          observations: 'Objervation 1',
          cabinId: '654012bbb1569a8178813b1a',
          userId: '6539180c4815d039bd002cdc'
        })
        .expect(403)
    })
    test('should return 204 on add booking with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/booking')
        .set('x-access-token', accessToken)
        .send({
          startDate: '2021-12-14T12:26:49.021+00:00',
          endDate: '2021-12-09T20:37:47.587+00:00',
          numNight: 5,
          mumGuest: 8,
          cabinPrice: 1500.00,
          extraPrice: 500.00,
          totalPrice: 2000.00,
          status: 'apto',
          hasBreakfast: true,
          isPaid: true,
          observations: 'Objervation 1',
          cabinId: '654012bbb1569a8178813b1a',
          userId: '6539180c4815d039bd002cdc'
        })
        .expect(204)
    })
  })
})
