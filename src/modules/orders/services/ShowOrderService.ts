import { AppError } from '@shared/errors/AppError'
import { Order } from '@shared/typeorm/entities/Order'
import { OrdersRepository } from '@shared/typeorm/repositories/OrdersRepository'

interface IRequest {
  id: string
}

export class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order | null> {
    const ordersRepository = OrdersRepository
    const order = ordersRepository.findById(id)

    if (!order) {
      throw new AppError('Order not found.')
    }
    return order
  }
}