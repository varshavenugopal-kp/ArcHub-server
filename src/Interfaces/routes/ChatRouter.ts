import { Router } from "express";
import { accessChatController, fetchChatController } from "../controllers/ChatController";
const router=Router()
router.post('/',accessChatController)
router.get('/fetchChat',fetchChatController)



export default router