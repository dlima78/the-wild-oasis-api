import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'

import { type Collection } from 'mongodb'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { mockAddGuestParams } from '@/tests/domain/mocks'

let guestCollection: Collection
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

describe('Guest Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    guestCollection = MongoHelper.getCollection('guests')
    await guestCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST/guest', () => {
    test('should return 403 on add guest', async () => {
      await request(app)
        .post('/api/guest')
        .send({
          fullName: 'Any Name',
          email: 'email@mail.com',
          nationality: 'any_nationality',
          countryFlag: 'ANY',
          nationalId: '55'
        })
        .expect(403)
    })
    test('should return 204 on add guest with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/guest')
        .set('x-access-token', accessToken)
        .send({
          fullName: 'Any Name',
          email: 'email@mail.com',
          nationality: 'any_nationality',
          countryFlag: 'ANY',
          nationalId: '55'
        })
        .expect(204)
    })
  })

  describe('GET/guests', () => {
    test('should return 403 on add guest', async () => {
      await request(app)
        .get('/api/guests')
        .expect(403)
    })
    test('should return 200 on load guests with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await guestCollection.insertMany(
        [mockAddGuestParams(),
          mockAddGuestParams()
        ])
      await request(app)
        .get('/api/guests')
        .set('x-access-token', accessToken)
        .expect(200)
    })
    test('should return 204 on add guest with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/guests')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
