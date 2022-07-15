import { AppError } from '@shared/errors/AppError'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

export interface IDeleteCustomer {
  id: string
}

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
