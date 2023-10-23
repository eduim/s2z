import express from 'express'

import userAuthorizationMiddleware from './middlewares/user-auth'
import UsersController from './controllers/usersController'
import SimulationController from './controllers/simulationController'

const router = express.Router()
const authRouter = express.Router()

router.post('/users', UsersController.createUser)
router.get('/login', UsersController.login)

authRouter.use(userAuthorizationMiddleware)

authRouter.get('/me', UsersController.me)
authRouter.get('/users/:id', UsersController.getUserById)

// include this in auth router when ready auth in client
router.post('/simulation', SimulationController.createSimulation)
router.post('/simulation/calculate', SimulationController.calculateSimulation)
router.get('/simulation/:id', SimulationController.getSimulatioin)
router.put('/simulation/:id', SimulationController.updateSimulation)

export { router, authRouter }
