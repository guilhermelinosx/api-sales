import { Customer } from '@shared/typeorm/entities/Customer'
import { CustomersRepository } from '@shared/typeorm/repositories/CustomersRepository'

export class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = CustomersRepository

    const customer = await customersRepository.find()
    return customer
  }
}
