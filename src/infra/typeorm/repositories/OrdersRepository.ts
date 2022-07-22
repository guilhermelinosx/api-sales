import { datasource } from '..'
import { Customer } from '../entities/Customer'
import { Order } from '../entities/Order'
import { Product } from '../entities/Product'

interface IRequest {
	customer: Customer
	products: Product[]
}

export const OrdersRepository = datasource.getRepository(Order).extend({
	async findById(id: string): Promise<Order | null> {
		const order = await this.findOne({
			where: { id },
			relations: ['order_products', 'customer']
		})

		return order
	},

	async createOrder({ customer, products }: IRequest): Promise<Order> {
		const order = this.create({
			customer,
			order_products: products
		})

		await this.save(order)

		return order
	}
})
