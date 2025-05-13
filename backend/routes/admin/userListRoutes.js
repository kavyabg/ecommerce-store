import express from 'express';
import { userList } from '../../controllers/admin/userListController.js';

const router = express.Router();

router.get("/userlist", userList);

export default router;