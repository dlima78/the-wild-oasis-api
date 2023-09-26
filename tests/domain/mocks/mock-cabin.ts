import { type AddCabin } from '@/domain/usecases/add-cabin'
import { faker } from '@faker-js/faker'

export const mockAddCabinParams = (): AddCabin.Params => ({
  name: faker.person.fullName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.int(),
  discount: faker.number.int(),
  description: faker.lorem.text(),
  image: faker.image.url()
})
