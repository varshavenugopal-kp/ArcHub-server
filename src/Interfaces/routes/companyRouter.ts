import { Router } from "express";
import {  EditAboutController, aboutAddController, companyLoginController, companyRegisterController, detailsAddController, detailsController, detailsEditController, getAboutController, imageAddController, jobAddController, projectAddController, projectController } from "../controllers/companyControllers";
import { userBlockController } from "../controllers/adminController";
import { companyAuth } from "../middlewares/companyAuth";
import { adminAuth } from "../middlewares/adminAuth";
const router = Router();

router.post('/register',companyRegisterController)
router.post('/login',companyLoginController)
router.post('/addjob',jobAddController)
router.post('/addProject',projectAddController)
router.post('/detailsAdd',detailsAddController)
router.post('/addAbout',aboutAddController)
router.get('/details/:cid',detailsController)
router.get('/project/:cid',projectController)
router.post('/imageAdd/:cid',imageAddController)
router.post('/editAbout',EditAboutController)
router.get('/getAbout/:cid',getAboutController)
router.get('/detailsEdit/:cid',detailsEditController)
// router.post('/user-block',userBlockController)
export default router;  
