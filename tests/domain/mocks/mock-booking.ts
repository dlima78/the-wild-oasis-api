import { type UpdateBooking, type AddBooking } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { type BookingModel } from '@/domain/models'

export const mockBookingModel = (): BookingModel => ({
  id: faker.string.uuid(),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  numNight: faker.number.int(30),
  mumGuest: faker.number.int(10),
  cabinPrice: faker.number.float({ precision: 0.01 }),
  extraPrice: faker.number.float({ precision: 0.01 }),
  totalPrice: faker.number.float({ precision: 0.01 }),
  status: faker.lorem.word(),
  hasBreakfast: faker.datatype.boolean(),
  isPaid: faker.datatype.boolean(),
  observations: faker.lorem.words(),
  cabinId: faker.string.uuid(),
  userId: faker.string.uuid()
})

export const mockBookingsModel = (): BookingModel[] => ([
  mockBookingModel(),
  mockBookingModel()
])
export const mockAddBookingParams = (): AddBooking.Params => ({
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  numNight: faker.number.int(30),
  mumGuest: faker.number.int(10),
  cabinPrice: faker.number.float({ precision: 0.01 }),
  extraPrice: faker.number.float({ precision: 0.01 }),
  totalPrice: faker.number.float({ precision: 0.01 }),
  status: faker.lorem.word(),
  hasBreakfast: faker.datatype.boolean(),
  isPaid: faker.datatype.boolean(),
  observations: faker.lorem.words(),
  cabinId: faker.string.uuid(),
  userId: faker.string.uuid()
})

export const mockUpdateBookingParams = (): UpdateBooking.Params => ({
  bookingId: faker.string.uuid(),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  numNight: faker.number.int(30),
  mumGuest: faker.number.int(30),
  cabinPrice: faker.number.float({ precision: 0.01 }),
  extraPrice: faker.number.float({ precision: 0.01 }),
  totalPrice: faker.number.float({ precision: 0.01 }),
  status: faker.lorem.word(),
  hasBreakfast: faker.datatype.boolean(),
  isPaid: faker.datatype.boolean(),
  observations: faker.lorem.words(),
  cabinId: faker.string.uuid(),
  userId: faker.string.uuid()
})
