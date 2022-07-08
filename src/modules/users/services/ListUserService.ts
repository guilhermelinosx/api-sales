import { User } from '@shared/typeorm/entities/User'
import { UsersRepository } from '@shared/typeorm/repositories/UsersRepository'

export class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = UsersRepository
    const user = usersRepository.find()
    return user
  }
}
