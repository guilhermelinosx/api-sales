import { dataSource } from '..'
import { User } from '../entities/User'

export const UsersRepository = dataSource.getRepository(User).extend({
	async findById(id: string): Promise<User | null> {
		const users = await this.findOneBy({ id })
		return users
	},

	async findByName(name: string): Promise<User | null> {
		const users = await this.findOneBy({ name })
		return users
	},

	async findByEmail(email: string): Promise<User | null> {
		const users = await this.findOneBy({ email })
		return users
	},
})
