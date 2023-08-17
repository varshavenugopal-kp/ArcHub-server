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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDelete = exports.serviceEdit = exports.getRequestsController = exports.sendEmail = exports.getcompanyDashboard = exports.getInfoController = exports.getAppliedDetailsController = exports.getAppliedsController = exports.jobEditController = exports.singleJobController = exports.listJobController = exports.JobListController = exports.getServiceController = exports.serviceController = exports.categoryController = exports.EditAboutController = exports.getAboutController = exports.detailsEditController = exports.logoAddController = exports.imageAddController = exports.projectController = exports.detailsController = exports.aboutAddController = exports.detailsAddController = exports.projectAddController = exports.jobAddController = exports.companyLoginController = exports.companyRegisterController = void 0;
const companyModel_1 = require("../../Infra/database/companyModel");
const Csignup_1 = require("../../App/usecases/Company/Csignup");
const companyRepository_1 = require("../../Infra/repositories/companyRepository");
const Clogin_1 = require("../../App/usecases/Company/Clogin");
const jobModel_1 = require("../../Infra/database/jobModel");
const jobRepository_1 = require("../../Infra/repositories/jobRepository");
const Addjob_1 = require("../../App/usecases/Company/Addjob");
const AddProject_1 = require("../../App/usecases/Company/AddProject");
const projectModel_1 = require("../../Infra/database/projectModel");
const projectRepository_1 = require("../../Infra/repositories/projectRepository");
const mongoose_1 = __importDefault(require("mongoose"));
const nodemailer = require('nodemailer');
const addDetails_1 = require("../../App/usecases/Company/addDetails");
const addAbout_1 = require("../../App/usecases/Company/addAbout");
const ViewDetails_1 = require("../../App/usecases/Company/ViewDetails");
const Addimage_1 = require("../../App/usecases/Company/Addimage");
const EditAbout_1 = require("../../App/usecases/Company/EditAbout");
const editDetails_1 = require("../../App/usecases/Company/editDetails");
const CategoryList_1 = require("../../App/usecases/user/CategoryList");
const Category_1 = require("../../Infra/database/Category");
const CategoryRepository_1 = require("../../Infra/repositories/CategoryRepository");
const addService_1 = require("../../App/usecases/Company/addService");
const Joblist_1 = require("../../App/usecases/user/Joblist");
const Getjob_1 = require("../../App/usecases/user/Getjob");
const EditJob_1 = require("../../App/usecases/Company/EditJob");
const Apply_1 = require("../../App/usecases/user/Apply");
const AppliedModel_1 = require("../../Infra/database/AppliedModel");
const applyRepository_1 = require("../../Infra/repositories/applyRepository");
const companyShow_1 = require("../../App/usecases/user/companyShow");
const Requests_1 = require("../../App/usecases/Company/Requests");
// import { updateJob } from "../../App/usecases/Company/EditJob";
// import { editAbout } from "../../App/usecases/Company/EditAbout";
const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = "sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456";
const db = companyModel_1.companyModel;
const jobdb = jobModel_1.jobModel;
const projectdb = projectModel_1.ProjectModel;
const categorydb = Category_1.categoryModel;
const applydb = AppliedModel_1.AppliedModel;
const companyRepository = (0, companyRepository_1.companyRepositoryImpl)(db);
const JobRepository = (0, jobRepository_1.JobRepositoryImpl)(jobdb);
const ProjectRepository = (0, projectRepository_1.ProjectRepositoryImpl)(projectdb);
const categoryRepository = (0, CategoryRepository_1.CategoryRepositoryImpl)(categorydb);
const applyRepository = (0, applyRepository_1.applyRepositoryImpl)(applydb);
const companyRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { cname, location, district, state, email, password, file } = req.body;
    try {
        const company = yield (0, Csignup_1.signupCompany)(companyRepository)(cname, location, district, state, email, password, file);
        if (company) {
            res.status(201).json({ message: "Signup successful", company });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.companyRegisterController = companyRegisterController;
const companyLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const company = yield (0, Clogin_1.loginCompany)(companyRepository)(email, password, true, true);
        console.log("lllooo");
        if (company) {
            console.log("lllll");
            const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
            const payload = {
                exp: expirationTime,
            };
            const token = jsonwebtoken.sign(payload, JWT_SECRET);
            res.json({ message: "login successful", company, token });
        }
        else {
            res.json({ invalid: "user not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.companyLoginController = companyLoginController;
const jobAddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, cId, salary, qualification, experience, deadline, type, description } = req.body;
    console.log("requestt", req.body);
    try {
        console.log("haiii");
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cId);
        const jobs = yield (0, Addjob_1.addJob)(JobRepository)(title, cmpnyId, salary, qualification, experience, deadline, type, description);
        if (jobs) {
            console.log("hhhh");
            res.status(201).json({ message: "successful", jobs });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.jobAddController = jobAddController;
//   export const projectAddController=async(req:Request,res:Response)=>{
//     console.log("vvvvv",req.body);
//     const {pname,cid,description,url}=req.body
//     console.log("pname",pname);
//     console.log("cid",cid);
//     console.log("description",description);
//     console.log("url",url);
//     try{
//         let cmpnyId=new mongoose.Types.ObjectId(cid)
//         const projects=await addProject(ProjectRepository)(cmpnyId,pname,description,url)
//         console.log("projectsss",projects);
//         if(projects){
//             console.log("varsha");
//             res.status(201).json({ message: "successful", projects });
//         }
//     }catch(error){
//         res.status(500).json({ message: "Internal server error" });
//     }
//   }
const projectAddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("vvvvv", req.body);
    const _a = req.body, { cid } = _a, projects = __rest(_a, ["cid"]);
    // console.log("pname",pname);
    console.log("cid", cid);
    // console.log("description",description);
    // console.log("url",url);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cid);
        const projectss = yield (0, AddProject_1.addProject)(companyRepository)(cmpnyId, projects);
        console.log("projectsss", projectss);
        if (projectss) {
            console.log("varsha");
            res.status(201).json({ message: "successful", projects });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.projectAddController = projectAddController;
const detailsAddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("moynthpranav", req.body);
    const { cId, datas } = req.body;
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cId);
        const details = yield (0, addDetails_1.addDetails)(companyRepository)(cmpnyId, datas);
        console.log("detailssss", details);
        if (details) {
            console.log("varsha");
            res.status(201).json({ message: "successful", details });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.detailsAddController = detailsAddController;
const aboutAddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("moynthadhin", req.body);
    const { cId } = req.body;
    const { description } = req.body;
    console.log("about", description);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cId);
        const details = yield (0, addAbout_1.addAbout)(companyRepository)(cmpnyId, description);
        console.log("detailssss", details);
        if (details) {
            console.log("varsha");
            res.status(201).json({ message: "successful", details });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.aboutAddController = aboutAddController;
const detailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cId = req.params.cid;
    console.log("params:", cId);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cId);
        const details = yield (0, ViewDetails_1.viewDetails)(companyRepository)(cmpnyId);
        if (details) {
            console.log("varshaaaaaayyyyyyyyyyy", details);
            res.status(201).json({ message: "successful", details });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.detailsController = detailsController;
const projectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cId = req.params.cid;
    console.log("cmpid", cId);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cId);
        const projects = yield (0, ViewDetails_1.viewDetails)(companyRepository)(cmpnyId);
        if (projects) {
            console.log("projects", projects);
            res.status(201).json({ message: "successful", projects });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.projectController = projectController;
const imageAddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body;
    const cid = req.params.cid;
    console.log('url:', url);
    console.log("iiidddsss", cid);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cid);
        let image = yield (0, Addimage_1.addImage)(companyRepository)(cmpnyId, url.fileUrl);
        if (image) {
            console.log("kjkjkjkj", image);
            res.status(201).json({ message: "successful", image });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.imageAddController = imageAddController;
const logoAddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body.logo;
    const cid = req.params.cid;
    console.log('url:', url);
    console.log("iiidddsssloogoooo", cid);
    console.log("microsoft", url);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cid);
        let logo = yield (0, Addimage_1.addlogo)(companyRepository)(cmpnyId, url);
        if (logo) {
            console.log("kjkjkjkj", logo);
            res.status(201).json({ message: "successful", logo });
        }
    }
    catch (error) {
        // res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
});
exports.logoAddController = logoAddController;
const detailsEditController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cId = req.params.cid;
    console.log("params:", cId);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cId);
        const details = yield (0, ViewDetails_1.viewDetails)(companyRepository)(cmpnyId);
        if (details) {
            console.log("ajaaaayyyy", details);
            res.status(201).json({ message: "successful", details });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.detailsEditController = detailsEditController;
const getAboutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cId = req.params.cid;
    console.log("Id here", cId);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cId);
        const details = yield (0, ViewDetails_1.viewDetails)(companyRepository)(cmpnyId);
        if (details) {
            console.log("varshhhha", details);
            res.status(201).json({ message: "successful", details });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAboutController = getAboutController;
const EditAboutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, cid } = req.body;
    console.log("this is about", cid);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cid);
        const about = yield (0, EditAbout_1.editAbout)(companyRepository)(cmpnyId, data);
        if (about) {
            console.log("ahhhh", about);
            res.status(201).json({ message: "successful", about });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.EditAboutController = EditAboutController;
const categoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.categoryController = categoryController;
const serviceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { cid } = _b, categories = __rest(_b, ["cid"]);
    console.log("how are you", categories);
    try {
        let cmpId = new mongoose_1.default.Types.ObjectId(cid);
        const services = yield (0, addService_1.addServices)(companyRepository)(cmpId, categories);
        console.log("detailssss", services);
        if (services) {
            console.log("varsha");
            res.status(201).json({ message: "successful", services });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.serviceController = serviceController;
const getServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cId = req.params.cid;
    console.log("cmpid", cId);
    try {
        let cmpnyId = new mongoose_1.default.Types.ObjectId(cId);
        const services = yield (0, ViewDetails_1.viewDetails)(companyRepository)(cmpnyId);
        if (services) {
            console.log("projects", services);
            res.status(201).json({ message: "successful", services });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getServiceController = getServiceController;
const JobListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield (0, Joblist_1.getJobs)(JobRepository)();
        if (jobs) {
            res.json({ message: 'Data found', jobs });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.JobListController = JobListController;
const listJobController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cid = req.params.cid;
    const cId = new mongoose_1.default.Types.ObjectId(cid);
    try {
        const jobs = yield (0, Joblist_1.jobList)(JobRepository)(cId);
        console.log("jobs listed", jobs);
        if (jobs) {
            res.json({ message: 'Data found', jobs });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.listJobController = listJobController;
const singleJobController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    try {
        let id = new mongoose_1.default.Types.ObjectId(jobId);
        const jobs = yield (0, Getjob_1.getjob)(JobRepository)(id);
        if (jobs) {
            res.json({ message: 'Data found', jobs });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.singleJobController = singleJobController;
const jobEditController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _c = req.body, { jobId } = _c, data = __rest(_c, ["jobId"]);
    console.log("id aaaayaaa", jobId);
    //    console.log("this is req.body",title);
    console.log("yeee", data);
    try {
        // let jobid=new mongoose.Types.ObjectId
        // const jobs=await updateJob(JobRepository)(jobId,data)
        let jbId = new mongoose_1.default.Types.ObjectId(jobId);
        const jobs = yield (0, EditJob_1.update)(JobRepository)(jbId, data);
        console.log("jobs edited", jobs);
        //    if(services){
        //     console.log("varsha");
        //     res.status(201).json({ message: "successful", services });
    }
    catch (error) {
    }
});
exports.jobEditController = jobEditController;
const getAppliedsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
    const cid = req.params.cid;
    console.log("nnnnnnnnnnnnnn", cid);
    const cId = new mongoose_1.default.Types.ObjectId(cid);
    const getApplied = yield (0, Apply_1.allapplied)(applyRepository)(cId);
    console.log(getApplied, "kkkk");
    if (getApplied) {
        res.json({ message: 'Data found', getApplied });
    }
});
exports.getAppliedsController = getAppliedsController;
const getAppliedDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
    const cid = req.params.cid;
    const userId = req.query.userId;
    console.log("nnnnnnnnnnnnnnIdddddddddd", userId);
    const cId = new mongoose_1.default.Types.ObjectId(cid);
    const uId = new mongoose_1.default.Types.ObjectId(userId);
    const getApplied = yield (0, Apply_1.allappliedDetails)(applyRepository)(cId, uId);
    console.log(getApplied, "kkkk");
    if (getApplied) {
        res.json({ message: 'Data found', getApplied });
    }
});
exports.getAppliedDetailsController = getAppliedDetailsController;
const getInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
    const cid = req.params.cid;
    console.log("nnnnnnnnnnnnnn", cid);
    const cId = new mongoose_1.default.Types.ObjectId(cid);
    const info = yield (0, companyShow_1.getCompany)(companyRepository)(cId);
    console.log(info, "kkkk");
    if (info) {
        res.json({ message: 'Data found', info });
    }
});
exports.getInfoController = getInfoController;
const getcompanyDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const cid = req.params.cid;
    const cId = new mongoose_1.default.Types.ObjectId(cid);
    try {
        const projects = yield (0, ViewDetails_1.viewDetails)(companyRepository)(cId);
        const projectCount = (_d = projects === null || projects === void 0 ? void 0 : projects.projects) === null || _d === void 0 ? void 0 : _d.length;
        console.log("project", projectCount);
        const services = yield (0, ViewDetails_1.viewDetails)(companyRepository)(cId);
        const servicesCount = (_e = services === null || services === void 0 ? void 0 : services.services) === null || _e === void 0 ? void 0 : _e.length;
        console.log("service", servicesCount);
        const applications = yield (0, Apply_1.allapplied)(applyRepository)(cId);
        const applicationCount = applications === null || applications === void 0 ? void 0 : applications.length;
        console.log("applied", applicationCount);
        const allJobs = yield (0, Joblist_1.jobList)(JobRepository)(cId);
        const jobCount = allJobs === null || allJobs === void 0 ? void 0 : allJobs.length;
        console.log("jobs", jobCount);
        console.log();
        res.json({ message: 'Data found', projectCount, servicesCount, applicationCount, jobCount });
    }
    catch (error) {
    }
});
exports.getcompanyDashboard = getcompanyDashboard;
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, companyemail } = req.body;
    try {
        // Configure Nodemailer with your email service credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'decorafurniture61@gmail.com',
                pass: process.env.EMAIL_PASSWORD, // Replace with your email password or an app-specific password
            },
        });
        // Send the email
        const info = yield transporter.sendMail({
            from: 'decorafurniture61@gmail.com',
            to: 'varshavenugopal642@gmail.com',
            subject: 'Congratulations! You have Been Shortlisted for this position ',
            text: 'We hope this email finds you well. We are pleased to inform you that you have been shortlisted for the position. Your application and qualifications have impressed our hiring team, and we would like to invite you to the next stage of the selection process.', // You can customize the email content here
        });
        console.log('Email sent:', info);
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Error sending email' });
    }
});
exports.sendEmail = sendEmail;
const getRequestsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cid = req.params.cid;
    console.log("cmpId", cid);
    try {
        const cId = new mongoose_1.default.Types.ObjectId(cid);
        const requests = yield (0, Requests_1.getRequests)(companyRepository)(cId);
        if (requests) {
            res.json({ requests });
        }
    }
    catch (_f) {
    }
});
exports.getRequestsController = getRequestsController;
const serviceEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { details, categories, cid } = req.body;
    console.log("serrrviicessss", details);
    const category = categories.category;
    console.log("serrrviicessss", category);
    console.log("serrrviicessss", cid);
    try {
        const cId = new mongoose_1.default.Types.ObjectId(cid);
        const updateddata = yield (0, editDetails_1.getUpdatedCategory)(companyRepository)(cId, category, details);
        if (updateddata) {
            res.json({ updateddata });
        }
    }
    catch (error) {
    }
});
exports.serviceEdit = serviceEdit;
const serviceDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { details, categories, cid } = req.body;
    console.log("deleeet", details);
    const category = categories.category;
    console.log("delete", categories);
    console.log("delete", cid);
    try {
        const cId = new mongoose_1.default.Types.ObjectId(cid);
        const deleteddata = yield (0, editDetails_1.getdeletedCategory)(companyRepository)(cId, category, details);
        if (deleteddata) {
            res.json({ deleteddata });
        }
    }
    catch (error) {
    }
});
exports.serviceDelete = serviceDelete;
