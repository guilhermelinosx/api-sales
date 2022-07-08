import { AppError } from '@shared/errors/AppError'
import { User } from '@shared/typeorm/entities/User'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'
import { hash, compare } from 'bcryptjs'

interface IRequest {
  id: string
  name: string
  email: string
  newPassword?: string
  oldPassword?: string
}

export class UpdateProfileService {
  public async execute({
    id,
    name,
    email,
    newPassword,
    oldPassword,
  }: IRequest): Promise<User> {
    const userRepository = UserRepository

    const user = await userRepository.findOneBy({ id })
    if (!user) {
      throw new AppError('User not found')
    }

    const userUpdateEmail = await userRepository.findByEmail(email)
    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError('There is already one user with this email.')
    }

    if (newPassword && !oldPassword) {
      throw new AppError('Old password is required')
    }

    if (newPassword && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password)
      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }
      user.password = await hash(newPassword, 8)
    }

    user.name = name
    user.email = email

    await userRepository.save(user)

    return user
  }
}
