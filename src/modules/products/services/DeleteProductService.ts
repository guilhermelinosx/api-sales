import { AppError } from '@src/infra/errors/AppError'
import { ProductsRepository } from '@src/infra/typeorm/repositories/ProductsRepository'
import { IDeleteProduct } from '../domain/interfaces/IDeleteProduct'

export class DeleteProductService {
	public async execute({ id }: IDeleteProduct): Promise<void> {
		const productsRepository = ProductsRepository

		const product = await productsRepository.findById(id)
		if (!product) {
			throw new AppError('Product not found.')
		}

		await productsRepository.remove(product)
	}
}
