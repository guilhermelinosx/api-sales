import { User } from '@modules/users/infra/typeorm/entities/User'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'

export class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = UsersRepository
    const user = usersRepository.find()
    return user
  }
}
