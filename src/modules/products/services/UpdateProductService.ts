import { AppError } from '@src/infra/errors/AppError'
import { ProductsRepository } from '@src/infra/typeorm/repositories/ProductsRepository'
import { IUpdateProduct } from '../domain/interfaces/IUpdateProduct'
import { IProduct } from '../domain/models/IProduct'

export class UpdateProductService {
	public async execute({
		id,
		name,
		price,
		quantity
	}: IUpdateProduct): Promise<IProduct> {
		const productsRepository = ProductsRepository

		const product = await productsRepository.findById(id)
		if (!product) {
			throw new AppError('Product not found.')
		}

		const productExists = await productsRepository.findByName(name)
		if (productExists && name === product.name) {
			throw new AppError('There is already one product with this name.')
		}

		product.name = name
		product.price = price
		product.quantity = quantity

		await productsRepository.save(product)
		return product
	}
}
