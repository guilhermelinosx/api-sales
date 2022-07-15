import { AppError } from '@shared/errors/AppError'
import { ICustomer } from '../domain/models/ICustomer'
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository'

export interface IShowCustomer {
  id: string
}

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
