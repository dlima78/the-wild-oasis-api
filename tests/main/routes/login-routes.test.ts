import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'

import { type Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST/signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo.manguinho@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo.manguinho@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(403)
    })
  })
})
