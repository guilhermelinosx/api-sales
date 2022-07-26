import { OrderProducts } from '@src/server/typeorm/entities/OrderProducts'

export interface IProduct {
	id: string
	order_products: OrderProducts[]
	name: string
	price: number
	quantity: number
	created_at: Date
	updated_at: Date
}
