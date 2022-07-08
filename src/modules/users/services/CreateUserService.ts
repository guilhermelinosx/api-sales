import { hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@shared/typeorm/entities/User'
import { UsersRepository } from '@shared/typeorm/repositories/UsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
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
