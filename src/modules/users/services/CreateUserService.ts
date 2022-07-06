import { hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@shared/typeorm/entities/User'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = UserRepository

    const userEmailExist = await userRepository.findByEmail(email)
    if (userEmailExist) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await userRepository.save(user)
    return user
  }
}
