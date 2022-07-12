import { ICustomer } from '../domain/models/ICustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
export class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<ICustomer[]> {
    const customer = await this.customersRepository.find()
    return customer
  }
}
