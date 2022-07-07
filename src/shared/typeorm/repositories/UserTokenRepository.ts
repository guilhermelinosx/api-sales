/* eslint-disable camelcase */
import { datasource } from '..'
import { UserToken } from '../entities/UserToken'

export const UserTokenRepository = datasource.getRepository(UserToken).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOneBy({ token })
    return userToken
  },

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.create({ user_id })
    await this.save(userToken)
    return userToken
  },
})
