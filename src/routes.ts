import { Router } from 'express'

import UserController from '@controllers/UserController'

const router = Router()

router.get('/', (request, response) => {
  return response.json({ SERVER: 'ON' })
})

router.post('/users', UserController.store)

router.get('/users/:id', UserController.show)

export default router
