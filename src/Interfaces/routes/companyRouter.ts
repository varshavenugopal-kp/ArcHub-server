import { Router } from "express";
import {  EditAboutController, JobListController, aboutAddController, categoryController, companyLoginController, companyRegisterController, detailsAddController, detailsController, detailsEditController, getAboutController, getServiceController, imageAddController, jobAddController,
    
    jobEditController,
    
    projectAddController, projectController, serviceController, singleJobController } from "../controllers/companyControllers";
import { userBlockController } from "../controllers/adminController";
import { companyAuth } from "../middlewares/companyAuth";
import { adminAuth } from "../middlewares/adminAuth";
const router = Router();

router.post('/register',companyRegisterController)
router.post('/login',companyLoginController)
router.post('/addjob',companyAuth,jobAddController)
router.post('/addProject',companyAuth,projectAddController)
router.post('/detailsAdd',companyAuth,detailsAddController)
router.post('/addAbout',companyAuth,aboutAddController)
router.get('/details/:cid',companyAuth,detailsController)
router.get('/project/:cid',companyAuth,projectController)
router.post('/imageAdd/:cid',companyAuth,imageAddController)
router.post('/editAbout',companyAuth,EditAboutController)
router.get('/getAbout/:cid',companyAuth,getAboutController)
router.get('/detailsEdit/:cid',companyAuth,detailsEditController)
router.get('/category-list',companyAuth,categoryController)
router.post('/addServices',companyAuth,serviceController)
router.get('/getServices/:cid',companyAuth,getServiceController)
router.get('/jobList',companyAuth,JobListController)
router.get('/singleJob/:jobId',companyAuth,singleJobController)
router.post('/editJob',companyAuth,jobEditController)
// router.post('/user-block',userBlockController)
export default router;  
