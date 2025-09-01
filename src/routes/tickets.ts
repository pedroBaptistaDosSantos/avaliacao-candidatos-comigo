import { Router } from 'express';
import { validateTicket, createTicket, getTickets, deleteTicket } from '../controllers/ticketController';
import { authenticateToken, requireRole } from '../middleware/auth';
const router: Router = Router();

router.post('/validate', validateTicket);
router.post('/', authenticateToken, createTicket);
router.get('/', authenticateToken, getTickets);

router.delete('/:id', authenticateToken, requireRole('ADMIN'), deleteTicket); 

export default router;