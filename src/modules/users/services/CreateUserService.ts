import { AppError } from '@src/server/errors/AppError'
import { UsersRepository } from '@src/server/typeorm/repositories/UsersRepository'
import { hash } from 'bcryptjs'
import { ICreateUser } from '../domain/interfaces/ICreateUser'
import { IUser } from '../domain/models/IUser'

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
			password: hashedPassword
		})

		await usersRepository.save(user)
		return user
	}
}
