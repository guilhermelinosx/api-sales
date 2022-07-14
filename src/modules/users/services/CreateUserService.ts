import { hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUser } from '../domain/models/IUser'

interface ICreateUser {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const usersRepository = UsersRepository

    const emailExists = await usersRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await usersRepository.save(user)
    return user
  }
}
