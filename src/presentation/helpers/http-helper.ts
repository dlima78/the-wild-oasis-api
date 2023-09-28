import { type HttpResponse } from '@/presentation/protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
