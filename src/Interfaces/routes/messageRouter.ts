import { Router } from "express";
import {  getMessagesByChatId, sendMessage,  } from "../controllers/ChatController";

const router=Router()
router.post('/send',sendMessage)

router.get('/:chatId',getMessagesByChatId)

export default router