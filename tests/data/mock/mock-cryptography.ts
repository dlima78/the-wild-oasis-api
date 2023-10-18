import {
  type HashComparer,
  type Encrypter,
  type Hasher,
  type Decrypter
} from '@/data/protocols'
import { faker } from '@faker-js/faker'

export class HasherSpy implements Hasher {
  digest = faker.string.uuid()
  plaintext!: string
  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.string.uuid()
  plaintext = ''
  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.ciphertext
  }
}

export class DecrypterSpy implements Decrypter {
  cyphertext = ''
  plaintext: null | string = faker.lorem.word()
  async decrypt (cyphertext: string): Promise<string | null> {
    this.cyphertext = cyphertext
    return this.plaintext
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext!: string
  digest!: string
  isValid = true
  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}
