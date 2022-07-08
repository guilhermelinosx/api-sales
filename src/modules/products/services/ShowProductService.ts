import { AppError } from '@shared/errors/AppError'
import { Product } from '@shared/typeorm/entities/Product'
import { ProductsRepository } from '@shared/typeorm/repositories/ProductsRepository'

interface IRequest {
  id: string
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = ProductsRepository

    const product = await productsRepository.findById(id)
    if (!product) {
      throw new AppError('Product not found.')
    }

    return product
  }
}
