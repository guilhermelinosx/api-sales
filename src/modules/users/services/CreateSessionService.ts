import { compare } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { sign } from 'jsonwebtoken'

interface ICreateSession {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

export class CreateSessionService {
  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IResponse> {
    const usersRepository = UsersRepository

    const user = await usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const userPasswordConfirmed = await compare(password, user.password)
    if (!userPasswordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = sign({}, process.env.JWT_TOKEN as string, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES as string,
    })

    return { user, token }
  }
}
