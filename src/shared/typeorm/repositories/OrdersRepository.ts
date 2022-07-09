import { datasource } from '..'
import { Customer } from '../entities/Customer'
import { Order } from '../entities/Order'

interface IProduct {
  product_id: string
  price: number
  quantity: number
}

interface IRequest {
  customer: Customer
  products: IProduct[]
}

export const OrdersRepository = datasource.getRepository(Order).extend({
  async findById(id: string): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['orders_products', 'customers'],
    })

    return order
  },

  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    })

    await this.save(order)

    return order
  },
})
