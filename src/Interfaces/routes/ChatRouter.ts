import { Router } from "express";
import { accessChatController, fetchCompanyChatController, fetchUserChatController } from "../controllers/ChatController";
const router=Router()
router.post('/',accessChatController)
router.get('/user-chat',fetchUserChatController)
router.get('/company-chat/:cmpId',fetchCompanyChatController)



export default router