import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import { hash } from 'bcrypt'

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
  describe('POST/login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Eduardo',
        email: 'eduardo@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'eduardo@mail.com',
          password: '123'
        })
        .expect(200)
    })
    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'eduardo@mail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
