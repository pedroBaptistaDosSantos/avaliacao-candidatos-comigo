import { Router } from 'express';
import { validateTicket, createTicket, getTickets } from '../controllers/ticketController';

const router: Router = Router();

router.post('/validate', validateTicket);
router.post('/', createTicket);
router.get('/', getTickets);

export default router;