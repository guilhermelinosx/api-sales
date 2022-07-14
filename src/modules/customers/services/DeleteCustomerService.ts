import { AppError } from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

export interface IDeleteCustomer {
  id: string
}

@injectable()
export class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }

    await this.customersRepository.remove(customer)
  }
}
