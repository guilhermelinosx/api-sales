import { AppError } from '@shared/errors/AppError'
import { UserRepository } from '@shared/typeorm/repositories/UserRepository'
import { UserTokenRepository } from '@shared/typeorm/repositories/UserTokenRepository'
import { EtherealMail } from '@config/mail/EtherealMail'
import path from 'path'

interface IRequest {
  email: string
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = UserRepository
    const userTokenRepository = UserTokenRepository

    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists.')
    }

    const { token } = await userTokenRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[ApiSales] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    })
  }
}
