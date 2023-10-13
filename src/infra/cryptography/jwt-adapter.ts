import { type Encrypter } from '@/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}
  async encrypt (plaintext: string): Promise<string> {
    const token = jwt.sign({ id: plaintext }, this.secret)
    return token
  }
}
