import { Customer } from "@modules/customers/infra/typeorm/entities/Customer"
import { OrderProducts } from "@modules/orders/infra/typeorm/entities/OrderProducts"

export interface IOrder {
  id: string
  customer: Customer
  order_products: OrderProducts[]
  created_at: Date
  updated_at: Date
}




