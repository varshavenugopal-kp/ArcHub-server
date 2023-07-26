import { Router } from "express";

const router=Router()
router.post('/send',sendMessageController)



export default router