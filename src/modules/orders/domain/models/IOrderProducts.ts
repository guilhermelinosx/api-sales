import { IProduct } from '@src/modules/products/domain/models/IProduct'
import { IOrder } from './IOrder'

export interface IOrderProducts {
	id: string
	order: IOrder
	product: IProduct
	order_id: string
	product_id: string
	price: number
	quantity: number
	created_at: Date
	updated_at: Date
}
