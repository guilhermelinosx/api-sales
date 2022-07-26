import express from 'express'
import { datasource } from './typeorm'

export const app = express()

datasource.initialize().then(() => {
	app.listen(3000, () => {
		console.info('The server is running on http://localhost:3000')
	})
})
