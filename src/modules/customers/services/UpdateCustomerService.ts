import { AppError } from '@shared/errors/AppError'
import { ICustomer } from '../domain/models/ICustomer'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

export interface IUpdateCustomer {
	id: string
	name: string
	email: string
}

export class UpdateCustomerService {
	public async execute({
		id,
		name,
		email
	}: IUpdateCustomer): Promise<ICustomer> {
		const customersRepository = CustomersRepository
		const customer = await customersRepository.findById(id)
		if (!customer) {
			throw new AppError('Customer not found.')
		}

		const customerExists = await customersRepository.findByEmail(email)
		if (customerExists && email === customer.email) {
			throw new AppError('There is already one customer with this email.')
		}

		customer.name = name
		customer.email = email

		await customersRepository.save(customer)
		return customer
	}
}
