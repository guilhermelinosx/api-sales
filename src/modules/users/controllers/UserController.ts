import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'
import { ListUserService } from '../services/ListUserService'

export class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService()
    const user = await listUser.execute()
    return res.json(user)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    const createUser = new CreateUserService()
    const user = await createUser.execute({ name, email, password })
    return res.json(user)
  }
}
