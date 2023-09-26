import { type HttpResponse } from '@/presentation/protocols'

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
