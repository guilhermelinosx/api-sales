import { AppError } from '@shared/errors/AppError'
import { ICreateCustomer } from '../domain/models/ICreateCustomer'
import { ICustomer } from '../domain/models/ICustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    })

    return customer
  }
}
