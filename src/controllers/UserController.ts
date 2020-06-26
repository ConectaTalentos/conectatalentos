import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

class UserController {
  async store(request: Request, response: Response) {
    const {
      name,
      email,
      area,
      escolaridade,
      data_nascimento,
      telefone,
      genero,
      sit_emprego,
      login,
      password,
      cpf,
      rua,
      bairro,
      cep,
      cidade,
      uf,
      numero
    } = request.body

    const emailExits = await prisma.user.findOne({
      where: { email }
    })

    const cpfExits = await prisma.user.findOne({
      where: { cpf }
    })

    if (cpfExits) {
      return response.status(400).json({ message: 'CPF já cadastrado' })
    }

    if (emailExits) {
      return response.status(400).json({ message: 'Email já cadastrado' })
    }

    const password_hash = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        login,
        password_hash,
        area,
        escolaridade,
        cpf,
        data_nascimento,
        genero,
        telefone,
        sit_emprego,
        addres: {
          create: {
            rua,
            bairro,
            cep,
            cidade,
            uf,
            numero
          }
        }
      }
    })

    response.json(user)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params

    const user = await prisma.user.findOne({
      where: {
        id: Number(id)
      },
      select: {
        name: true,
        email: true,
        area: true,
        escolaridade: true,
        data_nascimento: true,
        telefone: true,
        genero: true,
        sit_emprego: true,
        addres: {
          select: {
            rua: true,
            cidade: true,
            uf: true
          }
        }
      }

    })

    response.json(user)
  }
}

export default new UserController()
