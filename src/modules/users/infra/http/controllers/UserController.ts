import { CreateUserService } from '@modules/users/services/CreateUserService'
import { ListUserService } from '@modules/users/services/ListUserService'
import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'

export class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService()
    const user = await listUser.execute()
    return res.json(instanceToInstance(user))
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    const createUser = new CreateUserService()
    const user = await createUser.execute({ name, email, password })
    return res.json(instanceToInstance(user))
  }
}
