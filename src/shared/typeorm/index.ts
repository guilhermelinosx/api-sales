import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'
import { Product } from './entities/Product'
import { User } from './entities/User'
import { UserToken } from './entities/UserToken'
import { CreateProduct1657066844889 } from './migrations/1657066844889-CreateProduct'
import { CreateUser1657101689653 } from './migrations/1657101689653-CreateUser'
import { CreateUserTokens1657150924432 } from './migrations/1657150924432-CreateUserTokens'
import { CreateCustomers1657318221887 } from './migrations/1657318221887-CreateCustomers'
import { Customer } from './entities/Customer'
import { CreateOrders1657364509661 } from './migrations/1657364509661-CreateOrders'
import { AddCustomersIDtoOrders1657364996694 } from './migrations/1657364996694-AddCustomersIDtoOrders'
import { CreateOrdersProduct1657365700190 } from './migrations/1657365700190-CreateOrdersProduct'
import { AddOrdersIDtoOrdersProducts1657365876838 } from './migrations/1657365876838-AddOrdersIDtoOrdersProducts'
import { AddProductIDtoOrdersProducts1657366310333 } from './migrations/1657366310333-AddProductIDtoOrdersProducts'
import { Order } from './entities/Order'
import { OrderProducts } from './entities/OrderProducts'

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.ORM_HOST,
  port: Number(process.env.ORM_PORT),
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  synchronize: true,
  migrations: [
    CreateProduct1657066844889,
    CreateUser1657101689653,
    CreateUserTokens1657150924432,
    CreateCustomers1657318221887,
    CreateOrders1657364509661,
    AddCustomersIDtoOrders1657364996694,
    CreateOrdersProduct1657365700190,
    AddOrdersIDtoOrdersProducts1657365876838,
    AddProductIDtoOrdersProducts1657366310333,
  ],
  entities: [Product, User, UserToken, Customer, Order, OrderProducts],
})
