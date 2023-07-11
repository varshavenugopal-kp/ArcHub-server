import { Router } from "express";
import { adminLoginController, companyBlockController, companyRequestsController, companyUnblockController, requestAcceptController, showCompanyController, showUserController, userBlockController, userUnblockController } from "../controllers/adminController";
import { adminAuth } from "../middlewares/adminAuth";
const router = Router();

router.post('/login',adminLoginController)
router.get('/user-list',adminAuth,showUserController)
router.get('/company-list',showCompanyController)
router.post('/user-block',userBlockController)
router.post('/user-unblock',userUnblockController)
router.post('/company-block',companyBlockController)
router.post('/company-unblock',companyUnblockController)
router.get('/requests',companyRequestsController)
router.post('/accept-request',requestAcceptController)
router.post('/accept-request',requestAcceptController)

export default router