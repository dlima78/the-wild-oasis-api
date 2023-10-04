import { LogMongoRepository, MongoHelper } from '@/infra/db'
import { faker } from '@faker-js/faker'
import { type Collection } from 'mongodb'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

let errorCollection: Collection

describe('LogMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.lorem.words())
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
