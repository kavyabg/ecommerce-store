import express from 'express';
import { userList } from '../../controllers/admin/userListController.js';

const router = express.Router();

router.get("/", userList);

export default router;