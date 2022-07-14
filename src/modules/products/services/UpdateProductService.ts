import { IProduct } from '@modules/products/domain/models/IProduct'
import { AppError } from '@shared/errors/AppError'
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository'

interface IUpdateProduct {
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
