import { In } from 'typeorm'
import { datasource } from '..'
import { Product } from '../entities/Product'

export const ProductsRepository = datasource.getRepository(Product).extend({
	async findById(id: string): Promise<Product | null> {
		const products = await this.findOneBy({ id })
		return products
	},

	async findByName(name: string): Promise<Product | null> {
		const products = await this.findOneBy({ name })
		return products
	},

	async findByAllByIds(products: { id: string }[]): Promise<Product[]> {
		const productsIds = products.map(products => products.id)

		const productsExists = await this.find({
			where: {
				id: In(productsIds)
			}
		})
		return productsExists
	}
})
