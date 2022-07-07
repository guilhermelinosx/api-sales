import { compare } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@shared/typeorm/entities/User'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = UserRepository

    const user = await userRepository.findByEmail(email)
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
