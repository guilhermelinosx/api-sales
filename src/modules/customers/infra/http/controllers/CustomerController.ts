import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService'
import { DeleteCustomerService } from '@modules/customers/services/DeleteCustomerService'
import { ListCustomerService } from '@modules/customers/services/ListCustomerService'
import { ShowCustomerService } from '@modules/customers/services/ShowCustomerService'
import { UpdateCustomerService } from '@modules/customers/services/UpdateCustomerService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CustomerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomer = container.resolve(ListCustomerService)
    const customer = await listCustomer.execute()
    return res.json(customer)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const showCustomer = container.resolve(ShowCustomerService)
    const customer = await showCustomer.execute({ id })
    return res.json(customer)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body
    const createCustomer = container.resolve(CreateCustomerService)
    const customer = await createCustomer.execute({ name, email })
    return res.json(customer)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email } = req.body
    const updateCustomer = container.resolve(UpdateCustomerService)
    const customer = await updateCustomer.execute({ id, name, email })
    return res.json(customer)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteCustomer = container.resolve(DeleteCustomerService)
    await deleteCustomer.execute({ id })
    return res.json([])
  }
}
