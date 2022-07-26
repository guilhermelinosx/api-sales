import { IUser } from '../domain/models/IUser'
import { hash, compare } from 'bcryptjs'
import { UsersRepository } from '@src/server/typeorm/repositories/UsersRepository'
import { AppError } from '@src/server/errors/AppError'
import { IUpdateProfile } from '../domain/interfaces/IUpdateProfile'

export class UpdateProfileService {
	public async execute({
		id,
		name,
		email,
		newPassword,
		oldPassword
	}: IUpdateProfile): Promise<IUser> {
		const usersRepository = UsersRepository

		const user = await usersRepository.findById(id)
		if (!user) {
			throw new AppError('User not found')
		}

		const userUpdateEmail = await usersRepository.findByEmail(email)
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

		await usersRepository.save(user)

		return user
	}
}
