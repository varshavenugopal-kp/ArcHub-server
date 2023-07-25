import { Router } from "express";
import { appliedController, bookmarkController, getCategoryController, getCompanyController, getCompanylistController, getIdController, getSavedController, getjobController, getjobDetailsController, removeBookmarkController, userLoginController, userSignupController } from "../controllers/userController";
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






export default router;
