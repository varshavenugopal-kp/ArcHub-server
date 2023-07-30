import { Router } from "express";
import { allMessages, sendMessageController } from "../controllers/ChatController";

const router=Router()
router.post('/send',sendMessageController)

router.get('/msg/:chatId',allMessages)

export default router