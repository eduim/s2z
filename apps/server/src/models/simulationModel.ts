import {
  countryCodeType,
  simulationModeType,
  costsSeries,
  offSetSeries,
} from '@types'
import prisma from '../lib/prisma'

class Simulation {
  constructor(
    public id: number,
    public country: string,
    public mode: string,
    public offSet: offSetSeries[],
    public costs: costsSeries,
    public createdAt: Date,
    public updatedAt?: Date
  ) {}

  static async create(
    country: countryCodeType,
    mode: simulationModeType,
    offSet: offSetSeries[],
    costs: costsSeries
  ): Promise<Simulation> {
    const { id, createdAt } = await prisma.simulation.create({
      data: {
        country,
        mode,
        offSet,
        costs,
      },
    })

    return new Simulation(id, country, mode, offSet, costs, createdAt)
  }

  static async getSimulationById(id: number): Promise<Simulation> {
    console.log(id)
    const { country, mode, offSet, costs, createdAt } =
      await prisma.simulation.findUniqueOrThrow({
        where: {
          id,
        },
      })

    return new Simulation(
      id,
      country,
      mode,
      offSet as offSetSeries[],
      costs as costsSeries,
      createdAt
    )
  }

  static async updateSimulation(
    id: number,
    country: countryCodeType,
    mode: simulationModeType,
    offSet: offSetSeries[],
    costs: costsSeries
  ): Promise<Simulation> {
    const { createdAt, updatedAt } = await prisma.simulation.update({
      where: {
        id,
      },
      data: {
        country,
        mode,
        offSet,
        costs,
      },
    })

    return new Simulation(
      id,
      country,
      mode,
      offSet,
      costs,
      createdAt,
      updatedAt
    )
  }
}

export default Simulation
