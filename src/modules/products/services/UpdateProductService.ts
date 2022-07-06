import { AppError } from '@shared/errors/AppError'
import { Product } from '@shared/typeorm/entities/Product'
import { ProductRepository } from '@shared/typeorm/repositories/ProductRepository'

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = ProductRepository

    const product = await productRepository.findOneBy({ id })
    if (!product) {
      throw new AppError('Product not found.')
    }

    const productExists = await productRepository.findByName(name)
    if (productExists && name === product.name) {
      throw new AppError('There is already one product with this name.')
    }

    product.name = name
    product.price = price
    product.quantity = quantity

    await productRepository.save(product)
    return product
  }
}
