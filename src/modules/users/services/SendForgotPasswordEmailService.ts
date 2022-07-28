import { AppError } from '@src/server/errors/AppError'
import { UsersRepository } from '@src/server/typeorm/repositories/UsersRepository'
import { UserTokensRepository } from '@src/server/typeorm/repositories/UserTokensRepository'
import path from 'path'
import { ISendForgot } from '../domain/interfaces/IShowProfile'

export class SendForgotPasswordEmailService {
	public async execute({ email }: ISendForgot): Promise<void> {
		const usersRepository = UsersRepository
		const userTokensRepository = UserTokensRepository

		const user = await usersRepository.findByEmail(email)
		if (!user) {
			throw new AppError('User not found.')
		}

		const { token } = await userTokensRepository.generate(user.id)

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs'
		)
	}
}
