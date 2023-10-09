import { type Hasher } from '@/data/protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}
  async hash (plaintext: string): Promise<string> {
    const encryptValue = await bcrypt.hash(plaintext, this.salt)
    return encryptValue
  }
}
