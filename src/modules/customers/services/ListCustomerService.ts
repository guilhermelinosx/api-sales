import { ICustomer } from '../domain/models/ICustomer'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

export class ListCustomerService {
	public async execute(): Promise<ICustomer[]> {
		const customersRepository = CustomersRepository
		const customer = customersRepository.find()
		return customer
	}
}
