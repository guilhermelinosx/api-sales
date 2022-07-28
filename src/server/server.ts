import { app } from './app'
import { dataSource } from './typeorm'

dataSource.initialize().then(() => {
	app.listen(3000, () => {
		console.info('The server is running on http://localhost:3000 ✅')
	})
})
