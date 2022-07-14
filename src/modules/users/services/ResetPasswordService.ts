import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

interface IResetPassword {
  password: string
  token: string
}

export class ResetPasswordService {
  public async execute({ token, password }: IResetPassword): Promise<void> {
    const usersRepository = UsersRepository
    const userTokensRepository = UserTokensRepository

    const userTokens = await userTokensRepository.findByToken(token)
    if (!userTokens) {
      throw new AppError('User does not exists.')
    }

    const user = await usersRepository.findById(userTokens.user_id)
    if (!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userTokens.created_at
    const compareDate = addHours(tokenCreatedAt, 2)
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await hash(password, 8)

    await usersRepository.save(user)
  }
}
