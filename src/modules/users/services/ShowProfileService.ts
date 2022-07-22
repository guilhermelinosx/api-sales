import { AppError } from '@src/infra/errors/AppError'
import { UsersRepository } from '@src/infra/typeorm/repositories/UsersRepository'
import { IUser } from '../domain/models/IUser'

interface IShowProfile {
	id: string
}

export class ShowProfileService {
	public async execute({ id }: IShowProfile): Promise<IUser> {
		const usersRepository = UsersRepository

		const user = await usersRepository.findById(id)
		if (!user) {
			throw new AppError('User not found')
		}

		return user
	}
}
