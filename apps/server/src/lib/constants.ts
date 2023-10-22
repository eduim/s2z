import dotenv from 'dotenv'
dotenv.config()

if (!process.env.PORT) {
  throw new Error('missing PORT in .env')
}

export const PORT = process.env.PORT

if (!process.env.HOST) {
  throw new Error('missing HOST in .env')
}

export const HOST = process.env.HOST

if (!process.env.JWT_SECRET) {
  throw new Error('missing JWT_SECRET in .env')
}

export const JWT_SECRET = process.env.JWT_SECRET
