import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'
import { Product } from './entities/Product'
import { User } from './entities/User'
import { UserToken } from './entities/UserToken'
import { CreateProduct1657066844889 } from './migrations/1657066844889-CreateProduct'
import { CreateUser1657101689653 } from './migrations/1657101689653-CreateUser'
import { CreateUserTokens1657150924432 } from './migrations/1657150924432-CreateUserTokens'

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
  ],
  entities: [Product, User, UserToken],
})
