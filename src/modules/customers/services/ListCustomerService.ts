import { CustomersRepository } from '@src/infra/typeorm/repositories/CustomersRepository'
import { ICustomer } from '../domain/models/ICustomer'

export class ListCustomerService {
	public async execute(): Promise<ICustomer[]> {
		const customersRepository = CustomersRepository
		const customer = customersRepository.find()
		return customer
	}
}
