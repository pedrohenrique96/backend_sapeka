import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();

// instances
const _sessionController = new SessionController();

sessionsRouter.post('/', _sessionController.store);

export default sessionsRouter;
