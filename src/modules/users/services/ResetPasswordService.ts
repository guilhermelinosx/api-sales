import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'
import { UserTokenRepository } from '@shared/typeorm/repositories/UserTokenRepository'

interface IRequest {
  password: string
  token: string
}

export class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = UserRepository
    const userTokenRepository = UserTokenRepository

    const userToken = await userTokenRepository.findByToken(token)
    if (!userToken) {
      throw new AppError('User does not exists.')
    }
    const id = userToken.user_id

    const user = await userRepository.findOneBy({ id })
    if (!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await hash(password, 8)

    await userRepository.save(user)
  }
}
