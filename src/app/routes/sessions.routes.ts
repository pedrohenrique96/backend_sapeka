import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();

// instances
const sessionController = new SessionController();

sessionsRouter.post('/', sessionController.store);

export default sessionsRouter;
