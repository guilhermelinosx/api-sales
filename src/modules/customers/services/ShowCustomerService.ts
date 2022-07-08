import { AppError } from '@shared/errors/AppError'
import { Customer } from '@shared/typeorm/entities/Customer'
import { CustomersRepository } from '@shared/typeorm/repositories/CustomersRepository'

interface IRequest {
  id: string
}

export class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = CustomersRepository

    const customer = await customersRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }

    return customer
  }
}
