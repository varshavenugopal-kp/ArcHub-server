import { Router } from "express";
import {  EditAboutController, JobListController, aboutAddController, categoryController, companyLoginController, companyRegisterController, detailsAddController, detailsController, detailsEditController, getAboutController, getAppliedDetailsController, getAppliedsController, getInfoController, getRequestsController, getServiceController, getcompanyDashboard, imageAddController, jobAddController,
    
    jobEditController,
    
    listJobController,
    
    logoAddController,
    
    projectAddController, projectController, sendEmail, serviceController, singleJobController } from "../controllers/companyControllers";
import { userBlockController } from "../controllers/adminController";
import { companyAuth } from "../middlewares/companyAuth";
import { adminAuth } from "../middlewares/adminAuth";
import { getAppliedController } from "../controllers/userController";
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
router.post('/logoAdd/:cid',companyAuth,logoAddController)
router.post('/editAbout',companyAuth,EditAboutController)
router.get('/getAbout/:cid',companyAuth,getAboutController)
router.get('/detailsEdit/:cid',companyAuth,detailsEditController)
router.get('/category-list',companyAuth,categoryController)
router.post('/addServices',companyAuth,serviceController)
router.get('/getServices/:cid',companyAuth,getServiceController)
router.get('/jobList',companyAuth,JobListController)
router.get('/listJob/:cid',companyAuth,listJobController)
router.get('/singleJob/:jobId',companyAuth,singleJobController)
router.post('/editJob',companyAuth,jobEditController)
router.get('/getApplications/:cid',getAppliedsController)
router.get('/getCompanyInfo/:cid',getInfoController)
router.get('/companyDashboard/:cid',getcompanyDashboard)
router.get('/companyDashboard/:cid',getcompanyDashboard)
router.post('/sendEmail',sendEmail)
router.get('/getApplicationDetails/:cid',getAppliedDetailsController)
router.get('/msgRequests/:cid',getRequestsController)
// router.post('/user-block',userBlockController)
export default router;  
