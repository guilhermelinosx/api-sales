import { dataSource } from '..'
import { Customer } from '../entities/Customer'

export const CustomersRepository = dataSource.getRepository(Customer).extend({
	async findById(id: string): Promise<Customer | null> {
		const customers = await this.findOneBy({ id })
		return customers
	},

	async findByName(name: string): Promise<Customer | null> {
		const customers = await this.findOneBy({ name })
		return customers
	},

	async findByEmail(email: string): Promise<Customer | null> {
		const customers = await this.findOneBy({ email })
		return customers
	},
})
