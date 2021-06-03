import * as express from 'express';
import { chatController } from '../controller/chatController';
const router = express.Router();

router.get('/', chatController.index)

export default router;