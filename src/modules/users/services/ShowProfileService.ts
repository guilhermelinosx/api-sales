import { AppError } from '@shared/errors/AppError'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'

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
