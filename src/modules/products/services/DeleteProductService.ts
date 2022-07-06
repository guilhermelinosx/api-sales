import { AppError } from '@shared/errors/AppError'
import { ProductRepository } from '@shared/typeorm/repositories/ProductRepository'

interface IRequest {
  id: string
}

export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = ProductRepository

    const product = await productRepository.findOneBy({ id })
    if (!product) {
      throw new AppError('Product not found.')
    }

    await productRepository.remove(product)
  }
}
