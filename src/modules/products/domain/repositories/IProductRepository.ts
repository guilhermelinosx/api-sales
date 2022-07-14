import { IProduct } from '../models/IProduct'

export interface IProductRepository {
  findById(id: string): Promise<IProduct | null>
  findByName(name: string): Promise<IProduct | null>
  findByAllByIds(products: { id: string }[]): Promise<IProduct[]>
}
