import { AppError } from '@shared/errors/AppError'
import { Product } from '@shared/typeorm/entities/Product'
import { ProductRepository } from '@shared/typeorm/repositories/ProductRepository'

interface IRequest {
  id: string
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | null> {
    const productRepository = ProductRepository

    const product = await productRepository.findOneBy({ id })
    if (!product) {
      throw new AppError('Product not found.')
    }

    return product
  }
}
