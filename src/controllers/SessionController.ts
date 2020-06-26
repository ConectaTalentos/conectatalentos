import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

class SessionController {
  async store(request: Request, response: Response) {
    const { email, password_hash } = request.body

    const user = await prisma.user.findOne({
      where: { email }
    })

    if (!user) {
      return response.status(401).json({ message: 'Verifique o email digitado' })
    }

    if (!(await bcrypt.compare(password_hash, user.password))) {
      return response.status(401).json({ message: 'Verifique sua senha' })
    }

    const { id, name, area, escolaridade } = user

    return response.json({
      user: {
        name,
        email,
        area,
        escolaridade
      },
      token: jwt.sign({ id }, 'ConectaTalentos', {
        expiresIn: '365d'
      })
    })
  }
}

export default new SessionController()
