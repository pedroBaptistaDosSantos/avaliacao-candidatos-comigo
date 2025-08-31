import { Router } from 'express';
import { validateTicket } from '../controllers/ticketController';

const router: Router = Router();

router.post('/validate', validateTicket);

export default router;