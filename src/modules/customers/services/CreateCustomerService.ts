import { AppError } from '@shared/errors/AppError'
import { Customer } from '@shared/typeorm/entities/Customer'
import { CustomersRepository } from '@shared/typeorm/repositories/CustomersRepository'

interface IRequest {
  name: string
  email: string
}

export class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = CustomersRepository

    const emailExists = await customersRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const customer = customersRepository.create({
      name,
      email,
    })

    await customersRepository.save(customer)
    return customer
  }
}