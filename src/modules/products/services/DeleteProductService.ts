import { AppError } from "@shared/errors/AppError"
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository"

interface IRequest {
  id: string
}

export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = ProductsRepository

    const product = await productsRepository.findById(id)
    if (!product) {
      throw new AppError('Product not found.')
    }

    await productsRepository.remove(product)
  }
}
