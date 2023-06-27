import { Router } from "express";
import { companyLoginController, companyRegisterController } from "../controllers/companyControllers";
import { userBlockController } from "../controllers/adminController";
const router = Router();

router.post('/register',companyRegisterController)
router.post('/login',companyLoginController)
// router.post('/user-block',userBlockController)
export default router;