import { Router } from 'express';
import { validateTicket, createTicket, getTickets } from '../controllers/ticketController';
import { authenticateToken } from '../middleware/auth';
const router: Router = Router();

router.post('/validate', validateTicket);
router.post('/', authenticateToken, createTicket);
router.get('/', authenticateToken, getTickets);

export default router;