import { AppError } from '@src/infra/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from '../../../infra/typeorm/entities/User'
import { UsersRepository } from '../../../infra/typeorm/repositories/UsersRepository'
import { ICreateSession } from '../domain/interfaces/ICreateSession'

interface IReturn {
	user: User
	token: string
}

export class CreateSessionService {
	public async execute({ email, password }: ICreateSession): Promise<IReturn> {
		const usersRepository = UsersRepository

		const user = await usersRepository.findByEmail(email)
		if (!user) {
			throw new AppError('Incorrect email/password combination.', 401)
		}

		const userPasswordConfirmed = await compare(password, user.password)
		if (!userPasswordConfirmed) {
			throw new AppError('Incorrect email/password combination.', 401)
		}

		const token = sign({}, process.env.JWT_TOKEN as string, {
			subject: user.id,
			expiresIn: process.env.JWT_EXPIRES as string
		})

		return { user, token }
	}
}
