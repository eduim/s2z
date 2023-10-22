import express, { Express, Request, Response } from 'express'
import { PORT, HOST } from './lib/constants'

const app: Express = express()

app.get('/calculate', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.get('/save', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://${HOST}:${PORT}`)
})
