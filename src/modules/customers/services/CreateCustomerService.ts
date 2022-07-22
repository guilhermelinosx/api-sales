import { AppError } from '@src/infra/errors/AppError'
import { CustomersRepository } from '@src/infra/typeorm/repositories/CustomersRepository'
import { ICreateCustomer } from '../domain/interfaces/ICreateCustomer'
import { ICustomer } from '../domain/models/ICustomer'

export class CreateCustomerService {
	public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
		const customersRepository = CustomersRepository
		const emailExists = await customersRepository.findByEmail(email)
		if (emailExists) {
			throw new AppError('Email address already used.')
		}

		const customer = customersRepository.create({
			name,
			email
		})

		return customer
	}
}
