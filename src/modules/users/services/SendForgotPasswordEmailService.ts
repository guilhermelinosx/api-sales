import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import { EtherealMail } from '@config/mail/EtherealMail'
import path from 'path'

interface ISendForgot {
	email: string
}

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

		await EtherealMail.sendMail({
			to: {
				name: user.name,
				email: user.email
			},
			subject: '[ApiSales] Recuperação de Senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `http://localhost:3000/reset_password?token=${token}`
				}
			}
		})
	}
}
