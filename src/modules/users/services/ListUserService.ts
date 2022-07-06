import { User } from '@shared/typeorm/entities/User'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'

export class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = UserRepository

    const user = userRepository.find()
    return user
  }
}
