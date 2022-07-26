import { AppError } from '@src/server/errors/AppError'
import { ProductsRepository } from '@src/server/typeorm/repositories/ProductsRepository'
import { IShowProduct } from '../domain/interfaces/IShowProduct'
import { IProduct } from '../domain/models/IProduct'

export class ShowProductService {
	public async execute({ id }: IShowProduct): Promise<IProduct> {
		const productsRepository = ProductsRepository

		const product = await productsRepository.findById(id)
		if (!product) {
			throw new AppError('Product not found.')
		}

		return product
	}
}
