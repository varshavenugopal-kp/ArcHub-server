import { Router } from "express";
import { aboutAddController, companyLoginController, companyRegisterController, detailsAddController, detailsController, imageAddController, jobAddController, projectAddController, projectController } from "../controllers/companyControllers";
import { userBlockController } from "../controllers/adminController";
import { companyAuth } from "../middlewares/companyAuth";
const router = Router();

router.post('/register',companyRegisterController)
router.post('/login',companyLoginController)
router.post('/addjob',companyAuth,jobAddController)
router.post('/addProject',projectAddController)
router.post('/detailsAdd',detailsAddController)
router.post('/addAbout',aboutAddController)
router.get('/details/:cid',detailsController)
router.get('/project/:cid',companyAuth,projectController)
router.post('/imageAdd/:cid',imageAddController)
// router.post('/user-block',userBlockController)
export default router;  
