import { ICreateCustomer } from '@modules/customers/services/CreateCustomerService'
import { ICustomer } from '../models/ICustomer'

export interface ICustomersRepository {
  findById(id: string): Promise<ICustomer | null>
  findByName(name: string): Promise<ICustomer | null>
  findByEmail(email: string): Promise<ICustomer | null>
  create(data: ICreateCustomer): Promise<ICustomer>
  save(customer: ICustomer): Promise<ICustomer>
  remove(customer: ICustomer): Promise<void>
  find(): Promise<ICustomer[]>
}
