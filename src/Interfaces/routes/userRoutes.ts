import { Router } from "express";
import { userAuth} from '../middlewares/UserAuth'
import { AppliedController, appliedController, bookmarkController, checkStudForOtp, getAppliedController, getCategoryController, getCompanyController, getCompanylistController, getIdController, getProjectController, getSavedController, getcatWiseController, getjobController, getjobDetailsController, profilePicController, removeBookmarkController, requestController, resestPassword, updateController, userInfoController, userLoginController, userSignupController } from "../controllers/userController";
const router = Router();

router.post('/register',userSignupController);
router.post('/login',userLoginController);
router.get('/getCategory',userAuth,getCategoryController)
router.get('/getCompanyDetails/:cid',userAuth,getCompanyController)
router.get('/getjobs',userAuth,getjobController)
router.get('/getCompany',userAuth,getCompanylistController)
router.get('/getjobDetails/:jobId',userAuth,getjobDetailsController)
router.get('/getId/:jobId',userAuth,getIdController)
router.post('/jobApplied',userAuth,appliedController)
router.post('/addBookmark',userAuth,bookmarkController)
router.post('/bookmarkRemove',removeBookmarkController)
router.get('/getSavedjobs/:userid',userAuth,getSavedController)
router.get('/getAppliedJobs/:userid',userAuth,getAppliedController)
router.get('/getApplieds',userAuth,AppliedController)
router.get('/getCategoryWise/:category',userAuth,getcatWiseController)
router.get('/getProjectByName/:id',userAuth,getProjectController)
router.post('/profilepic/:userid',userAuth,profilePicController)
router.get('/getUserInfo/:userid',userAuth,userInfoController)
router.post('/check-user',userAuth,checkStudForOtp)
router.post('/reset-password',userAuth, resestPassword)
router.post('/updateProfile/:userid',userAuth,updateController)
router.post('/addRequest',userAuth,requestController)


// router.post('/resetPassword',resetPasswordController)






export default router;
