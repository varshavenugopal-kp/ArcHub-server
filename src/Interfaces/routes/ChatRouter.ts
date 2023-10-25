import { Router } from "express";
import { accessChatController, fetchCompanyChatController, fetchUserChatController } from "../controllers/ChatController";
import { userAuth } from "../middlewares/UserAuth";
import { companyAuth } from "../middlewares/companyAuth";
const router=Router()
router.post('/access-chat',accessChatController)
router.get('/user-chat/:userid',userAuth,fetchUserChatController)
router.get('/company-chat/:cid',companyAuth,fetchCompanyChatController)



export default router