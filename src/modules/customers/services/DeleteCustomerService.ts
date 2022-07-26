import { AppError } from '@src/server/errors/AppError'
import { CustomersRepository } from '@src/server/typeorm/repositories/CustomersRepository'
import { IDeleteCustomer } from '../domain/interfaces/IDeleteCustomer'

export class DeleteCustomerService {
	public async execute({ id }: IDeleteCustomer): Promise<void> {
		const customersRepository = CustomersRepository
		const customer = await customersRepository.findById(id)
		if (!customer) {
			throw new AppError('Customer not found.')
		}

		await customersRepository.remove(customer)
	}
}
