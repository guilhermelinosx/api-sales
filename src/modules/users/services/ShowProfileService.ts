import { AppError } from '@shared/errors/AppError'
import { User } from '@shared/typeorm/entities/User'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'

interface IRequest {
  id: string
}

export class ShowProfileService {
  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = UserRepository

    const user = await userRepository.findOneBy({ id })
    if (!user) {
      throw new AppError('User not found')
    }

    return user
  }
}
