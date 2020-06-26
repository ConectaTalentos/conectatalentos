import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

class EnterpriseController {
  async store(request: Request, response: Response) {
    const {
      name,
      login,
      email,
      password,
      cnpj,
      telefone,
      numero,
      rua,
      bairro,
      cidade,
      UF
    } = request.body

    const emailExits = await prisma.enterprise.findOne({
      where: { email }
    })

    const loginExits = await prisma.enterprise.findOne({
      where: { login }
    })

    const cnpfExits = await prisma.enterprise.findOne({
      where: { cnpj }
    })

    if (emailExits) {
      return response.status(400).json({ message: 'Email já cadastrado' })
    }

    if (loginExits) {
      return response.status(400).json({ message: 'login já cadastrado' })
    }

    if (cnpfExits) {
      return response.status(400).json({ message: 'CNPJ já cadastrado' })
    }

    const password_hash = await bcrypt.hash(password, 8)

    const enterprise = await prisma.enterprise.create({
      data: {
        name,
        login,
        email,
        password: password_hash,
        cnpj,
        telefone,
        addresInterprise: {
          create: {
            numero,
            rua,
            bairro,
            cidade,
            UF
          }
        }
      }
    })

    response.json(enterprise)
  }
}

export default new EnterpriseController()
