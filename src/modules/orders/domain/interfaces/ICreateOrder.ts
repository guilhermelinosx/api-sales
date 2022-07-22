export interface ICreateOrder {
	customer_id: string
	products: { id: string; quantity: number; price: number }[]
}
