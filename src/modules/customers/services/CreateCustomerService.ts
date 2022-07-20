import { AppError } from '@shared/errors/AppError'
import { ICustomer } from '../domain/models/ICustomer'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

export interface ICreateCustomer {
	name: string
	email: string
}

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
