/* eslint-disable camelcase */
import { dataSource } from '..'
import { UserToken } from '../entities/UserToken'

export const UserTokensRepository = dataSource.getRepository(UserToken).extend({
	async findByToken(token: string): Promise<UserToken | null> {
		const userTokens = await this.findOneBy({ token })
		return userTokens
	},

	async generate(user_id: string): Promise<UserToken> {
		const userTokens = this.create({ user_id })
		await this.save(userTokens)
		return userTokens
	},
})
