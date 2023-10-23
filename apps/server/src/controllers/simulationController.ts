import {
  purchaseData,
  simulationModeType,
  countryCodeType,
  offSetSeries,
  costsSeries,
} from '@types'
import { NextFunction, Request, Response } from 'express'
import {
  costsSimulator,
  countriesEmissionsPp,
  offsetSimulator,
} from '../lib/simulator'
import Simulation from '../models/simulationModel'

const SimulationController = {
  async createSimulation(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, mode, country } = req.body

      if (
        (data as purchaseData[]) &&
        (mode as simulationModeType) &&
        (country as countryCodeType)
      ) {
        const offSetSeries: offSetSeries[] = offsetSimulator(
          data,
          countriesEmissionsPp[country as countryCodeType],
          mode
        )

        const costsSeries: costsSeries = costsSimulator(
          data,
          offSetSeries?.length as number,
          mode
        )

        const simulation = await Simulation.create(
          country,
          mode,
          offSetSeries,
          costsSeries
        )

        res.status(201).json({ simulation })
        return
      }
      throw new Error('Incorrect data send')
    } catch (e) {
      next(e)
    }
  },

  calculateSimulation(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, mode, country } = req.body

      if (
        (data as purchaseData[]) &&
        (mode as simulationModeType) &&
        (country as countryCodeType)
      ) {
        const offSetSeries: offSetSeries[] = offsetSimulator(
          data,
          countriesEmissionsPp[country as countryCodeType],
          mode
        )

        const costsSeries: costsSeries = costsSimulator(
          data,
          offSetSeries?.length as number,
          mode
        )

        console.log(offSetSeries, costsSeries)

        res.status(201).json({
          simulation: {
            country,
            mode,
            offSet: offSetSeries,
            costs: costsSeries,
          },
        })
        return
      }
      throw new Error('Incorrect data send')
    } catch (e) {
      next(e)
    }
  },

  async getSimulatioin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const simulation = await Simulation.getSimulationById(parseInt(id))

      if (!simulation) throw new Error('Simulation not found')

      res.status(200).json({ simulation })
      return
    } catch (e) {
      next(e)
    }
  },
  async updateSimulation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { data, mode, country } = req.body

      if (
        (data as purchaseData[]) &&
        (mode as simulationModeType) &&
        (country as countryCodeType)
      ) {
        const offSetSeries: offSetSeries[] = offsetSimulator(
          data,
          countriesEmissionsPp[country as countryCodeType],
          mode
        )

        const costsSeries: costsSeries = costsSimulator(
          data,
          offSetSeries?.length as number,
          mode
        )

        const simulation = await Simulation.updateSimulation(
          parseInt(id),
          country,
          mode,
          offSetSeries,
          costsSeries
        )

        res.status(200).json({ simulation })
        return
      }
      throw new Error('Incorrect data send')
    } catch (e) {
      next(e)
    }
  },
}

export default SimulationController
