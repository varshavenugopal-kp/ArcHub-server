import { Router } from "express";
import { getCategoryController, getCompanyController, getCompanylistController, getjobController, getjobDetailsController, userLoginController, userSignupController } from "../controllers/userController";
const router = Router();

router.post('/register',userSignupController);
router.post('/login',userLoginController);
router.get('/getCategory',getCategoryController)
router.get('/getCompanyDetails/:cid',getCompanyController)
router.get('/getjobs',getjobController)
router.get('/getCompanies',getCompanylistController)
router.get('/getjobDetails/:jobId',getjobDetailsController)



export default router;
