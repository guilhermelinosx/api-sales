import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { IOrder } from '../domain/models/IOrder'
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository'
import '../../products/domain/models/IProduct'

/* eslint-disable camelcase */

interface ICreateOrder {
	customer_id: string
	products: { id: string; quantity: number; price: number }[]
}

export class CreateOrderService {
	public async execute({
		customer_id,
		products
	}: ICreateOrder): Promise<IOrder> {
		const ordersRepository = OrdersRepository
		const customersRepository = CustomersRepository
		const productsRepository = ProductsRepository

		const customerExists = await customersRepository.findById(customer_id)
		if (!customerExists) {
			throw new AppError('Could not find any customer with the given id.')
		}

		const productsExists = await productsRepository.findByAllByIds(products)
		if (!productsExists) {
			throw new AppError('Could not find any products with the given ids.')
		}

		const productsExistsIds = productsExists.map(product => product.id)

		const checkInexistentProducts = products.filter(
			product => !productsExistsIds.includes(product.id)
		)
		if (checkInexistentProducts.length) {
			throw new AppError(
				`Could not find products ${checkInexistentProducts[0].id}.`
			)
		}

		const quantityAvailable = products.filter(
			product =>
				productsExists.filter(p => p.id === product.id)[0].quantity <
				Number(product.quantity)
		)
		if (quantityAvailable.length) {
			throw new AppError(
				`the quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`
			)
		}

		const serializedProducts = products.map(product => ({
			product_id: product.id,
			quantity: Number(product.quantity),
			price: productsExists.filter(p => p.id === product.id)[0].price
		}))

		const order = await ordersRepository.createOrder({
			customer: customerExists,
			products: serializedProducts
		})

		const { order_products } = order

		const updatedProductsQuantity = order_products.map(
			(product: { product_id: string; quantity: number }) => ({
				id: product.product_id,
				quantity: Number(
					productsExists.filter(p => p.id === product.product_id)[0].quantity -
						product.quantity
				)
			})
		)

		await productsRepository.save(updatedProductsQuantity)

		return order
	}
}
