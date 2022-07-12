/* eslint-disable camelcase */
import { datasource } from '@shared/infra/typeorm'
import { UserToken } from '../entities/UserToken'

export const UserTokensRepository = datasource.getRepository(UserToken).extend({
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
