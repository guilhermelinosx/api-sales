import { AppError } from '@src/infra/errors/AppError'
import { CustomersRepository } from '@src/infra/typeorm/repositories/CustomersRepository'
import { IShowCustomer } from '../domain/interfaces/IShowCustomer'
import { ICustomer } from '../domain/models/ICustomer'

export class ShowCustomerService {
	public async execute({ id }: IShowCustomer): Promise<ICustomer> {
		const customersRepository = CustomersRepository
		const customer = await customersRepository.findById(id)
		if (!customer) {
			throw new AppError('Customer not found.')
		}

		return customer
	}
}
