/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '@shared/errors/AppError'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'
import { UserTokenRepository } from '@shared/typeorm/repositories/UserTokenRepository'

interface IRequest {
  email: string
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = UserRepository
    const userTokenRepository = UserTokenRepository

    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists.')
    }

    const token = await userTokenRepository.generate(user.id)
    console.log(token)
  }
}
