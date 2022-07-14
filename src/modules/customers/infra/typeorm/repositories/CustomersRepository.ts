import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { ICreateCustomer } from '@modules/customers/services/CreateCustomerService'
import { datasource } from '@shared/infra/typeorm'
import { Repository } from 'typeorm'
import { Customer } from '../entities/Customer'

export class CustomersRepository implements ICustomersRepository {
  private orm: Repository<Customer>

  constructor() {
    this.orm = datasource.getRepository(Customer)
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.orm.create({ name, email })
    await this.orm.save(customer)
    return customer
  }

  public async remove(customer: Customer): Promise<void> {
    await this.orm.remove(customer)
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.orm.save(customer)
    return customer
  }

  public async find(): Promise<Customer[]> {
    const customer = this.orm.find()
    return customer
  }

  public async findById(id: string): Promise<Customer | null> {
    const customers = await this.orm.findOneBy({ id })
    return customers
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customers = await this.orm.findOneBy({ name })
    return customers
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customers = await this.orm.findOneBy({ email })
    return customers
  }
}
