import { Router } from "express";
import { userAuth} from '../middlewares/UserAuth'
import { appliedController, bookmarkController, checkStudForOtp, getAppliedController, getCategoryController, getCompanyController, getCompanylistController, getIdController, getProjectController, getSavedController, getcatWiseController, getjobController, getjobDetailsController, profilePicController, removeBookmarkController, requestController, resestPassword, updateController, userInfoController, userLoginController, userSignupController } from "../controllers/userController";
const router = Router();

router.post('/register',userSignupController);
router.post('/login',userLoginController);
router.get('/getCategory',getCategoryController)
router.get('/getCompanyDetails/:cid',getCompanyController)
router.get('/getjobs',getjobController)
router.get('/getCompany',getCompanylistController)
router.get('/getjobDetails/:jobId',getjobDetailsController)
router.get('/getId/:jobId',getIdController)
router.post('/jobApplied',appliedController)
router.post('/addBookmark',bookmarkController)
router.post('/bookmarkRemove',removeBookmarkController)
router.get('/getSavedjobs/:userid',getSavedController)
router.get('/getAppliedJobs/:userid',getAppliedController)
router.get('/getCategoryWise/:category',getcatWiseController)
router.get('/getProjectByName/:id',getProjectController)
router.post('/profilepic/:userid',profilePicController)
router.get('/getUserInfo/:userid',userInfoController)
router.post('/check-user',checkStudForOtp)
router.post('/reset-password', resestPassword)
router.post('/updateProfile/:userid',updateController)
router.post('/addRequest',requestController)

// router.post('/resetPassword',resetPasswordController)






export default router;
