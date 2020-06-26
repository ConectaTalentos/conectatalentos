import { Router } from 'express'

import authMiddleware from './middlewares/auth'

import UserController from '@controllers/UserController'
import EnterpriseConroller from '@controllers/EnterpriseConroller'
import SessionController from '@controllers/SessionController'

const router = Router()

router.get('/', (request, response) => {
  return response.json({ SERVER: 'ON' })
})

router.post('/sessions', SessionController.store)

router.post('/users', UserController.store)
router.post('/enterprises', EnterpriseConroller.store)

router.use(authMiddleware)

router.get('/users/:id', UserController.show)

export default router
