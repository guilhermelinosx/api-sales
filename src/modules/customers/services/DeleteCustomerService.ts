import { AppError } from '@shared/errors/AppError'
import { CustomersRepository } from '@shared/typeorm/repositories/CustomersRepository'

interface IRequest {
  id: string
}

export class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = CustomersRepository
    const customer = await customersRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }

    await customersRepository.remove(customer)
  }
}
