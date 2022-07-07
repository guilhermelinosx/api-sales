import 'reflect-metadata'
import 'dotenv/config'
import { app } from './app'
import { datasource } from '@shared/typeorm'

datasource.initialize().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log('Server Run')
  })
})
