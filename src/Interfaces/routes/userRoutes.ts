import { Router } from "express";
import { userAuth} from '../middlewares/UserAuth'
import { appliedController, bookmarkController, getAppliedController, getCategoryController, getCompanyController, getCompanylistController, getIdController, getProjectController, getSavedController, getcatWiseController, getjobController, getjobDetailsController, profilePicController, removeBookmarkController, userInfoController, userLoginController, userSignupController } from "../controllers/userController";
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
router.get('/getSavedjobs',getSavedController)
router.get('/getAppliedJobs/:userid',getAppliedController)
router.get('/getCategoryWise',getcatWiseController)
router.get('/getProjectByName/:id',getProjectController)
router.post('/profilepic/:userid',profilePicController)
router.get('/getUserInfo/:userid',userInfoController)






export default router;
