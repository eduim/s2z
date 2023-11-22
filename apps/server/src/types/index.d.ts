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

export type offSetSeries = {
  date: string
  total: number
}

export type costsSeries = {
  costsSeries: offSetSeries[]
  totalCost: number
}

export interface authRequest extends Request {
  userId: number
}
