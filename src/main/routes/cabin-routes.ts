import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/cabin', (req, res) => {
    res.status(204)
    res.send()
  })
}
