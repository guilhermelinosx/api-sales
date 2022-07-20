import { ICustomer } from '@modules/customers/domain/models/ICustomer'
import { IOrderProducts } from './IOrderProducts'

export interface IOrder {
	id: string
	customer: ICustomer
	order_products: IOrderProducts[]
	created_at: Date
	updated_at: Date
}
