import { AppError } from '@shared/errors/AppError'
import { User } from '@shared/typeorm/entities/User'
import { UsersRepository } from '@shared/typeorm/repositories/UsersRepository'

interface IRequest {
  id: string
}

export class ShowProfileService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = UsersRepository

    const user = await usersRepository.findById(id)
    if (!user) {
      throw new AppError('User not found')
    }

    return user
  }
}
