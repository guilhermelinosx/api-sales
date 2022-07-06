import { compare } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@shared/typeorm/entities/User'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const userRepository = UserRepository

    const userLogin = await userRepository.findByEmail(email)
    if (!userLogin) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordConfirmed = await compare(password, userLogin.password)
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    return userLogin
  }
}
