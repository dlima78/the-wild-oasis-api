import { type LogErrorRepository } from '@/data/protocols'

export class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string | null = null
  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}
