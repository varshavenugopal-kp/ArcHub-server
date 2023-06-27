import { Router } from "express";
import { adminLoginController, companyBlockController, companyUnblockController, showCompanyController, showUserController, userBlockController, userUnblockController } from "../controllers/adminController";
const router = Router();

router.post('/login',adminLoginController)
router.get('/user-list',showUserController)
router.get('/company-list',showCompanyController)
router.post('/user-block',userBlockController)
router.post('/user-unblock',userUnblockController)
router.post('/company-block',companyBlockController)
router.post('/company-unblock',companyUnblockController)
export default router