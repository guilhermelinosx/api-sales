import { AppError } from '@src/server/errors/AppError'
import { ProductsRepository } from '@src/server/typeorm/repositories/ProductsRepository'
import { ICreateProduct } from '../domain/interfaces/ICreateProduct'
import { IProduct } from '../domain/models/IProduct'

export class CreateProductService {
	public async execute({
		name,
		price,
		quantity
	}: ICreateProduct): Promise<IProduct> {
		const productsRepository = ProductsRepository

		const productExists = await productsRepository.findByName(name)
		if (productExists) {
			throw new AppError('There is already one product with this name.')
		}

		const product = productsRepository.create({
			name,
			price,
			quantity
		})

		await productsRepository.save(product)
		return product
	}
}
