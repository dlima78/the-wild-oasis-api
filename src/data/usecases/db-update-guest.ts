import { type UpdateGuestRepository } from '@/data/protocols'
import { type GuestModel } from '@/domain/models'
import { type UpdateGuest } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export class DbUpdateGuest implements UpdateGuest {
  constructor (
    private readonly updateGuestRepository: UpdateGuestRepository
  ) {}

  async update (params: UpdateGuest.Params): Promise<GuestModel> {
    await this.updateGuestRepository.update(params)
    return {
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      nationality: faker.location.country(),
      countryFlag: faker.lorem.word(3),
      nationalId: faker.location.countryCode()
    }
  }
}
