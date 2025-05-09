import express from 'express';
import { getUserByEmail } from '../controllers/userController.js'; 

const router = express.Router();

router.get('/email/:email', getUserByEmail); 

export default router;
