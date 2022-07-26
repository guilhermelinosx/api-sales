import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '@src/server/typeorm/entities/User'
import { UserToken } from '@src/server/typeorm/entities/UserToken'
import { CreateProduct1657066844889 } from './migrations/1657066844889-CreateProduct'
import { CreateUser1657101689653 } from './migrations/1657101689653-CreateUser'
import { CreateUserTokens1657150924432 } from './migrations/1657150924432-CreateUserTokens'
import { CreateCustomers1657318221887 } from './migrations/1657318221887-CreateCustomers'
import { CreateOrders1657364509661 } from './migrations/1657364509661-CreateOrders'
import { AddCustomersIDtoOrders1657364996694 } from './migrations/1657364996694-AddCustomersIDtoOrders'
import { CreateOrdersProduct1657365700190 } from './migrations/1657365700190-CreateOrdersProduct'
import { AddOrdersIDtoOrdersProducts1657365876838 } from './migrations/1657365876838-AddOrdersIDtoOrdersProducts'
import { AddProductIDtoOrdersProducts1657366310333 } from './migrations/1657366310333-AddProductIDtoOrdersProducts'
import { Product } from './entities/Product'
import { Customer } from './entities/Customer'
import { Order } from './entities/Order'
import { OrderProducts } from './entities/OrderProducts'

export const datasource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'admin',
	password: 'admin',
	database: 'apisales',
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
		AddProductIDtoOrdersProducts1657366310333
	],
	entities: [Product, User, UserToken, Customer, Order, OrderProducts]
})
