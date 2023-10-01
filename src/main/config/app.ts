import setupMiddlewares from '@/main/config/middelwares'
import setupRoutes from '@/main/config/routes'
import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app
