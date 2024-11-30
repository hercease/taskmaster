import { Router } from 'express';
import { register, login } from '../controllers/UserController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;

//FNfcUaXrOw1DbdvI //mongodb password
//hercease001 //mongodb username