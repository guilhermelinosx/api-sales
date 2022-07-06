import { datasource } from '..'
import { User } from '../entities/User'

export const UserRepository = datasource.getRepository(User).extend({
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOneBy({ email })
    return user
  },

  async findByName(name: string): Promise<User | null> {
    const user = await this.findOneBy({ name })
    return user
  },
})
