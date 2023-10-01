import setupMiddlewares from '@/main/config/middelwares'
import express from 'express'

const app = express()
setupMiddlewares(app)
export default app
