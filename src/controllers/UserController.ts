import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

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
      estado,
      numero

    } = request.body

    const user = await prisma.user.create({
      data: {
        name,
        email,
        login,
        password,
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
            estado,
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
            bairro: true,
            cidade: true,
            estado: true
          }
        }
      }

    })

    response.json(user)
  }
}

export default new UserController()
