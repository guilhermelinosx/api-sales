import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUser } from '../domain/models/IUser'

export class ListUserService {
  public async execute(): Promise<IUser[]> {
    const usersRepository = UsersRepository
    const user = usersRepository.find()
    return user
  }
}
