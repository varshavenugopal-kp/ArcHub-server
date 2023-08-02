import { Router } from "express";
import { adminLoginController, categoryAddController, categoryController, companyBlockController, companyRequestsController, companyUnblockController, requestAcceptController, showCompanyController, showUserController, userBlockController, userUnblockController } from "../controllers/adminController";
import { adminAuth } from "../middlewares/adminAuth";
const router = Router();

router.post('/login',adminLoginController)
router.get('/user-list',adminAuth,showUserController)
router.get('/company-list',adminAuth,showCompanyController)
router.post('/user-block',adminAuth,userBlockController)
router.post('/user-unblock',adminAuth,userUnblockController)
router.post('/company-block',adminAuth,companyBlockController)
router.post('/company-unblock',adminAuth,companyUnblockController)
router.get('/requests',adminAuth,companyRequestsController)
router.post('/accept-request',adminAuth,requestAcceptController)
router.post('/accept-request',adminAuth,requestAcceptController)
router.post('/categoryAdd',adminAuth,categoryAddController)
router.get('/category-list',adminAuth,categoryController)

export default router