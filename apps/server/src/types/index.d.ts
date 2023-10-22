import { countryCode, simulationMode } from '../lib/simulator'
import { Request } from 'express'

export type countryCodeType = keyof typeof countryCode
export type simulationModeType = keyof typeof simulationMode

export type purchaseData = {
  id: string
  date: Date
  trees: number
}

export type simulatorDataType = {
  country: countryCodeType
  mode: simulationModeType
  data: purchaseData[]
}

interface PrismaErrorMessage {
  error: string
}

declare global {
  namespace Express {
    interface Request {
      userId?: number
    }
  }
}

interface DecodedToken extends JwtPayload {
  userId: number
}
