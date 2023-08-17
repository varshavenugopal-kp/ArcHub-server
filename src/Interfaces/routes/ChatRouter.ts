import { Router } from "express";
import { accessChatController, fetchCompanyChatController, fetchUserChatController } from "../controllers/ChatController";
const router=Router()
router.post('/access-chat',accessChatController)
router.get('/user-chat/:userid',fetchUserChatController)
router.get('/company-chat/:cid',fetchCompanyChatController)



export default router