import { Router } from 'express'

import UserController from '@controllers/UserController'
import EnterpriseConroller from '@controllers/EnterpriseConroller'

const router = Router()

router.get('/', (request, response) => {
  return response.json({ SERVER: 'ON' })
})

router.post('/users', UserController.store)
router.get('/users/:id', UserController.show)

router.post('/enterprises', EnterpriseConroller.store)

export default router
