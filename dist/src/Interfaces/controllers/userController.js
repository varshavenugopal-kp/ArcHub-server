"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateController = exports.resestPassword = exports.checkStudForOtp = exports.userInfoController = exports.profilePicController = exports.getProjectController = exports.getcatWiseController = exports.AppliedController = exports.getAppliedController = exports.getSavedController = exports.removeBookmarkController = exports.requestController = exports.bookmarkController = exports.appliedController = exports.getIdController = exports.getjobDetailsController = exports.getCompanyController = exports.getCompanylistController = exports.getjobController = exports.getCategoryController = exports.userLoginController = exports.userSignupController = void 0;
const userModel_1 = require("../../Infra/database/userModel");
const userRepository_1 = require("../../Infra/repositories/userRepository");
const signupUse_1 = require("../../App/usecases/user/signupUse");
const LoginUseCase_1 = require("../../App/usecases/user/LoginUseCase");
const Category_1 = require("../../Infra/database/Category");
const CategoryRepository_1 = require("../../Infra/repositories/CategoryRepository");
const CategoryList_1 = require("../../App/usecases/user/CategoryList");
const jobModel_1 = require("../../Infra/database/jobModel");
const jobRepository_1 = require("../../Infra/repositories/jobRepository");
const Joblist_1 = require("../../App/usecases/user/Joblist");
const companyManage_1 = require("../../App/usecases/admin/companyManage");
const companyModel_1 = require("../../Infra/database/companyModel");
const companyRepository_1 = require("../../Infra/repositories/companyRepository");
const mongoose_1 = __importDefault(require("mongoose"));
const otpSender = require('node-otp-sender');
const Getjob_1 = require("../../App/usecases/user/Getjob");
const companyShow_1 = require("../../App/usecases/user/companyShow");
const GetId_1 = require("../../App/usecases/user/GetId");
const AppliedModel_1 = require("../../Infra/database/AppliedModel");
const applyRepository_1 = require("../../Infra/repositories/applyRepository");
const Apply_1 = require("../../App/usecases/user/Apply");
const AddBookmark_1 = require("../../App/usecases/user/AddBookmark");
const removeBookmark_1 = require("../../App/usecases/user/removeBookmark");
const getSaved_1 = require("../../App/usecases/user/getSaved");
const getCategoryWise_1 = require("../../App/usecases/user/getCategoryWise");
const AddProject_1 = require("../../App/usecases/Company/AddProject");
const AddProfile_1 = require("../../App/usecases/user/AddProfile");
const userManage_1 = require("../../App/usecases/admin/userManage");
const UpdateProfile_1 = require("../../App/usecases/user/UpdateProfile");
// import { getProjectByName } from "../../App/usecases/Company/ViewProjects";
// import jsonwebtoken from 'jsonwebtoken'
const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = "sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456";
const db = userModel_1.userModel;
const catDb = Category_1.categoryModel;
const jobDb = jobModel_1.jobModel;
const cmpdb = companyModel_1.companyModel;
const applydb = AppliedModel_1.AppliedModel;
const userRepository = (0, userRepository_1.UserRepositoryImpl)(db);
const companyRepository = (0, companyRepository_1.companyRepositoryImpl)(cmpdb);
const categoryRepository = (0, CategoryRepository_1.CategoryRepositoryImpl)(catDb);
const jobRepository = (0, jobRepository_1.JobRepositoryImpl)(jobDb);
const applyRepository = (0, applyRepository_1.applyRepositoryImpl)(applydb);
const userSignupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fname, lname, email, password, isGoogle } = req.body;
    console.log("hiii=", req.body);
    //  console.log("helllo");
    try {
        const user = yield (0, signupUse_1.signupUser)(userRepository)(fname, lname, email, password, isGoogle);
        console.log("user", user);
        if (user) {
            res.status(201).json({ message: "Signup successful", user });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.log('err=', error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.userSignupController = userSignupController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("hii=", req.body);
    console.log('jjj=', email);
    console.log("nvnvvn", password);
    // console.log("helllo");
    try {
        const user = yield (0, LoginUseCase_1.LoginUser)(userRepository)(email, password);
        console.log("user", user);
        if (user) {
            const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
            const payload = {
                exp: expirationTime,
            };
            const token = jsonwebtoken.sign(payload, JWT_SECRET);
            res.json({ message: "login successful", user, token });
        }
        else {
            res.json({ invalid: "user not found" });
        }
    }
    catch (error) {
        console.log('errrrr=', error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.userLoginController = userLoginController;
const getCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, CategoryList_1.getCategories)(categoryRepository)();
        if (categories) {
            res.json({ message: 'Data found', categories });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCategoryController = getCategoryController;
const getjobController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield (0, Joblist_1.getJobs)(jobRepository)();
        if (jobs) {
            res.json({ message: 'Data found', jobs });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getjobController = getjobController;
const getCompanylistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        console.log("therse areeee....", page);
        const pageNo = parseInt(page);
        console.log("here areeeee.......", pageNo);
        const companyData = yield (0, companyManage_1.showCompany)(companyRepository)(pageNo);
        const pages = yield (0, companyManage_1.cmpCount)(companyRepository)();
        console.log("pages", pages);
        console.log("haai varsha", companyData);
        if (companyData) {
            res.json({ message: 'Data found', companyData, pages });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCompanylistController = getCompanylistController;
const getCompanyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cid = req.params.cid;
    console.log("id here?", cid);
    try {
        let id = new mongoose_1.default.Types.ObjectId(cid);
        const companies = yield (0, companyShow_1.getCompany)(companyRepository)(id);
        if (companies) {
            res.json({ message: 'Data found', companies });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCompanyController = getCompanyController;
const getjobDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    try {
        let id = new mongoose_1.default.Types.ObjectId(jobId);
        const jobs = yield (0, Getjob_1.getjob)(jobRepository)(id);
        if (jobs) {
            res.json({ message: 'Data found', jobs });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getjobDetailsController = getjobDetailsController;
const getIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    console.log("is this jobId here?", jobId);
    try {
        let id = new mongoose_1.default.Types.ObjectId(jobId);
        const jobs = yield (0, GetId_1.getId)(jobRepository)(id);
        if (jobs) {
            res.json({ message: 'Data found', id: jobs.cId });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getIdController = getIdController;
const appliedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("pleaaase comee", req.body);
    const { firstName, lastName, email, phone, qualification, experience, date, skills, jobid, cid, file, userId } = req.body;
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cid);
        const userid = new mongoose_1.default.Types.ObjectId(userId);
        const jobId = new mongoose_1.default.Types.ObjectId(jobid);
        const details = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            qualification: qualification,
            experience: experience,
            date: date
        };
        const job = yield (0, Apply_1.apply)(applyRepository)(cmpnyId, jobId, userid, details, skills, file);
        console.log("here is the jobs", job);
        if (job) {
            res.status(201).json({ message: "successful", job });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.appliedController = appliedController;
const bookmarkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId, uid } = req.body;
    console.log("blaablaa", jobId);
    console.log("runnnn", uid);
    try {
        let userId = new mongoose_1.default.Types.ObjectId(uid);
        const jobid = new mongoose_1.default.Types.ObjectId(jobId);
        const jobs = yield (0, AddBookmark_1.addBookmark)(jobRepository)(jobid, userId);
        if (jobs) {
            res.json({ message: 'Data found', jobs });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.bookmarkController = bookmarkController;
const requestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, cid } = req.body;
    console.log("blaablaa", userid);
    console.log("blaablaahhh", cid);
    try {
        let userId = new mongoose_1.default.Types.ObjectId(userid);
        let cmpId = new mongoose_1.default.Types.ObjectId(cid);
        const request = yield (0, AddBookmark_1.addRequest)(companyRepository)(userId, cmpId);
        if (request) {
            res.json({ message: 'request sent' });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.requestController = requestController;
const removeBookmarkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId, uid } = req.body;
    console.log("blaablaa", jobId);
    console.log("runnnn", uid);
    try {
        // let userId=new mongoose.Types.ObjectId(uId)
        const jobid = new mongoose_1.default.Types.ObjectId(jobId);
        const jobs = yield (0, removeBookmark_1.removeBookmark)(jobRepository)(jobid, uid);
        if (jobs) {
            res.json({ message: 'Data found', jobs });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.removeBookmarkController = removeBookmarkController;
const getSavedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uId = req.params.userid;
    try {
        // let userId=new mongoose.Types.ObjectId(uId)
        //  const jobid=new mongoose.Types.ObjectId(jobId)
        const getJobs = yield (0, getSaved_1.getSaved)(jobRepository)(uId);
        if (getJobs) {
            res.json({ message: 'Data found', getJobs });
        }
    }
    catch (error) {
    }
});
exports.getSavedController = getSavedController;
// export const getAppliedController=async(req:Request,res:Response)=>{
//    const userid=req.params.userid
//    console.log('jjj',userid);
//    const userId=new mongoose.Types.ObjectId(userid)
//    const appliedJobs=await getApplied(applyRepository)(userId)
//    console.log("lalalaaa",appliedJobs);
//    if(appliedJobs){
//     res.json({message:'Data found',appliedJobs})
//    }
// }
const getAppliedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
    const userid = req.params.userid;
    console.log("nnnnnnnnnnnnnn", userid);
    const userId = new mongoose_1.default.Types.ObjectId(userid);
    const getApplied = yield (0, Apply_1.applied)(applyRepository)(userId);
    console.log(getApplied, "kkkk");
    if (getApplied) {
        res.json({ message: 'Data found', getApplied });
    }
});
exports.getAppliedController = getAppliedController;
const AppliedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
    const userid = req.query.userid;
    const jobId = req.query.jobId;
    console.log("nnnnnnnnnnnnnn", userid);
    const userId = new mongoose_1.default.Types.ObjectId(userid);
    const jobid = new mongoose_1.default.Types.ObjectId(jobId);
    const getApplied = yield (0, Apply_1.appliedjobs)(applyRepository)(userId, jobid);
    console.log(getApplied, "kkkk");
    if (getApplied) {
        res.json({ job: true, getApplied });
    }
    else {
        res.json({ job: false });
    }
});
exports.AppliedController = AppliedController;
const getcatWiseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    console.log("categoryId", category);
    try {
        const company = yield (0, getCategoryWise_1.getCompanies)(companyRepository)(category);
        console.log("gott", company);
        if (company) {
            res.json({ message: 'Data found', company });
        }
    }
    catch (error) {
    }
});
exports.getcatWiseController = getcatWiseController;
const getProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("enthaaaavooo", id);
    const projects = yield (0, AddProject_1.getProjectByName)(companyRepository)(id);
    console.log("gott", projects);
    if (projects) {
        res.json({ message: 'Data found', projects: projects[0].projects });
    }
});
exports.getProjectController = getProjectController;
const profilePicController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, "hhehhee");
    const image = req.body.files;
    const userid = req.params.userid;
    console.log("heyy", image);
    console.log("yooo", userid);
    try {
        let userId = new mongoose_1.default.Types.ObjectId(userid);
        console.log("heyy", userid);
        const imagee = yield (0, AddProfile_1.updateImage)(userRepository)(userId, image);
        if (imagee) {
            console.log("kjkjkjkj", imagee);
            res.status(201).json({ message: "successful", imagee });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.profilePicController = profilePicController;
const userInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userid;
    try {
        let userId = new mongoose_1.default.Types.ObjectId(id);
        let userData = yield (0, userManage_1.getUser)(userRepository)(userId);
        if (userData) {
            res.json({ message: 'Data found', userData });
        }
    }
    catch (error) {
    }
});
exports.userInfoController = userInfoController;
const checkStudForOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        console.log('em=', email);
        const emailCheck = yield (0, LoginUseCase_1.CheckUser)(userRepository)(email);
        if (emailCheck) {
            const senderEmail = `${process.env.REACT_APP_SENDER_EMAIL}`;
            const senderPassword = `${process.env.REACT_APP_SENDER_PASSWORD}`;
            const recipientEmail = email;
            const subject = 'OTP Verification';
            otpSender(senderEmail, senderPassword, recipientEmail, subject)
                .then((response) => {
                console.log(response);
                res.status(201).json({ message: 'Email exist', emailExist: true, otp: response.otp });
            })
                .catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            res.json({ message: 'Email doesnot exist!', emaiExist: false });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.checkStudForOtp = checkStudForOtp;
const resestPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log('email=', email);
        console.log('password=', password);
        const result = yield (0, LoginUseCase_1.passwordReset)(userRepository)(email, password);
        if (result) {
            res.status(201).json({ message: 'Password reset successfull', result });
        }
        else {
            res.json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.resestPassword = resestPassword;
const updateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.params.userid;
    console.log(userid, "kkkkkkkkk");
    const { data } = req.body;
    console.log(data.fname);
    console.log(data.lname);
    console.log(data.email);
    console.log(data.image);
    // console.log(uId);
    console.log(req.body);
    try {
        const updatedData = yield (0, UpdateProfile_1.updateProfile)(userRepository)(data.fname, data.lname, data.email, data.image, userid);
        res.status(201).json({ message: 'successfull', updatedData });
    }
    catch (error) {
    }
});
exports.updateController = updateController;
