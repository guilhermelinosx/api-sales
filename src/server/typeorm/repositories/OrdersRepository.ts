import { IProduct } from '@src/modules/products/domain/models/IProduct'
import { IOrder } from '@src/modules/orders/domain/models/IOrder'
import { dataSource } from '..'
import { Customer } from '../entities/Customer'
import { Order } from '../entities/Order'
import { OrderProducts } from '../entities/OrderProducts'
import { Product } from '../entities/Product'

interface IRequest {
	customer: Customer
	products: IProduct[]
}

export const OrdersRepository = dataSource.getRepository(Order).extend({
	async findById(id: string): Promise<Order | null> {
		const order = await this.findOne({
			where: { id },
			relations: ['order_products', 'customer'],
		})

		return order
	},

	async createOrder({ customer, products }: IRequest): Promise<Order> {
		const order = this.create({
			customer,
			order_products: products,
		})

		await this.save(order)

		return order
	},
})
