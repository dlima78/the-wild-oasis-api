import { type Decrypter, type Encrypter } from '@/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    const token = jwt.sign({ id: plaintext }, this.secret)
    return token
  }

  async decrypt (cyphertext: string): Promise<string | null> {
    jwt.verify(cyphertext, this.secret)
    return null
  }
}
