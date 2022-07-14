import { Customer } from '@modules/customers/infra/typeorm/entities/Customer'
import { IProduct } from '@modules/products/domain/models/IProduct'
import { IOrder } from '../models/IOrder'

export interface IOrderProduct {
  findById(id: string): Promise<IOrder | null>
  createOrder(customer: Customer, products: IProduct[]): Promise<IOrder>
}
