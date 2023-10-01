import request from 'supertest'

import app from '@/main/config/app'

describe('Cabin', () => {
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
