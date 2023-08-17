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
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const companyRepositoryImpl = (companyModel) => {
    const create = (company) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createdCompany = yield companyModel.create(company);
            console.log("created", createdCompany);
            return createdCompany.toObject();
        }
        catch (error) {
            console.log(error);
        }
    });
    const loginCompany = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const companyCheck = yield companyModel.findOne({ email });
        return companyCheck ? companyCheck.toObject() : null;
    });
    const cmpCount = () => __awaiter(void 0, void 0, void 0, function* () {
        let Count = yield companyModel.countDocuments({ status: true });
        const limit = 6;
        let skip = 0;
        const page = Count / limit;
        console.log(page, "counts");
        let cmpCount = Math.ceil(page);
        console.log(cmpCount, "__________________________________________________");
        let pagecount = [];
        for (let i = 1; i <= cmpCount; i++) {
            pagecount.push(i);
        }
        console.log("pageCount", pagecount);
        return pagecount;
    });
    const showCompany = (page) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = 4;
        let skip = 0;
        skip = (page - 1) * limit;
        const companyData = yield companyModel.find({ regStatus: true }).limit(limit).skip(skip);
        console.log("companyData", companyData);
        return companyData.map((company) => company.toObject());
    });
    const showCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
        const companyData = yield companyModel.find({ regStatus: true });
        console.log("companyData", companyData);
        return companyData.map((company) => company.toObject());
    });
    const blockCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield companyModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: false } });
        return result;
    });
    const unblockCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield companyModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: true } });
        return result;
    });
    const showRequests = () => __awaiter(void 0, void 0, void 0, function* () {
        const requests = yield companyModel.find({ regStatus: false });
        console.log("requests", requests);
        return requests.map((company) => company.toObject());
    });
    const requestAccept = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield companyModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { regStatus: true, status: true } });
        console.log("nnnn", result);
        return result;
    });
    const detailsAdd = (details, id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ssss", details);
        const createdDetails = yield companyModel.updateOne({ _id: id }, { $set: { details: details } });
        return createdDetails;
    });
    const projectAdd = (projects, id) => __awaiter(void 0, void 0, void 0, function* () {
        const createdProjects = yield companyModel.updateOne({ _id: id }, { $push: { projects: projects } });
        console.log(".......", projects);
        return createdProjects;
    });
    const aboutAdd = (cId, description) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ssss", description);
        const createdAbout = yield companyModel.updateOne({ _id: cId }, { $set: { description: description } });
        return createdAbout;
    });
    const viewDetails = (cId) => __awaiter(void 0, void 0, void 0, function* () {
        const details = yield companyModel.findOne({ _id: cId });
        console.log("checkingggg", details);
        return details;
    });
    // const viewAbout=async(cId:mongoos.Types.ObjectId):Promise<Company|null>=>{
    //     const details=await companyModel.findOne({_id:cId})
    //     return details
    // }
    const addImage = (cid, image) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ssss", image);
        console.log("ooo", cid);
        const createdImage = yield companyModel.updateOne({ _id: cid }, { $set: { image: image } });
        console.log(createdImage);
        return createdImage;
    });
    const addlogo = (cid, image) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ssss", image);
        console.log("ooo", cid);
        const createdImage = yield companyModel.updateOne({ _id: cid }, { $set: { logo: image } });
        console.log(createdImage);
        return createdImage;
    });
    const editAbout = (cid, data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ssss", data);
        const aboutEdit = yield companyModel.updateOne({ _id: cid }, { $set: { description: data } });
        return aboutEdit;
    });
    const detailsEdit = (details, id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ssss", details);
        const createdDetails = yield companyModel.updateOne({ _id: id }, { $set: { details: details } });
        return createdDetails;
    });
    const getCompany = (cid) => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield companyModel.findOne({ _id: cid });
        console.log("varsha", company);
        return company;
    });
    const addServices = (services, cid) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ssss", services);
        const createdServices = yield companyModel.updateOne({ _id: cid }, { $push: { services: services } });
        console.log("....", services);
        return createdServices;
    });
    const deleteCategory = (cId, category, details) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ssss", category);
        const deletedServices = yield companyModel.updateOne({ _id: cId }, { $pull: { services: { category: category } } });
        console.log("....");
        console.log(deletedServices);
        return deletedServices;
    });
    const getCompanyList = (category) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("catId", category);
        const companies = yield companyModel.find({
            services: {
                $elemMatch: {
                    category: category
                }
            }
        });
        console.log("noo", companies);
        return companies;
    });
    const getProjects = (pname) => __awaiter(void 0, void 0, void 0, function* () {
        const getproject = yield companyModel.aggregate([{ $unwind: "$projects" }, { $match: { "projects.pname": pname } }]);
        console.log("varsha", getproject);
        return getproject;
    });
    const request = (userId, cmpId) => __awaiter(void 0, void 0, void 0, function* () {
        const requests = yield companyModel.updateOne({ _id: cmpId }, { $push: { requests: userId } });
        console.log("good spirit pls come", requests);
        return requests;
    });
    const getRequests = (cId) => __awaiter(void 0, void 0, void 0, function* () {
        const getRequests = yield companyModel.find({ _id: cId }, { requests: 1 });
        return getRequests ? getRequests : null;
    });
    const updateCategory = (cId, category, details) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(cId);
        console.log(category);
        console.log(details);
        const getUpdatedData = yield companyModel.updateOne({ _id: cId, "services.category": category }, { $set: { "services.$.details": details } });
        console.log(getUpdatedData);
        return getUpdatedData;
    });
    return {
        create,
        loginCompany,
        showCompany,
        showCompanies,
        blockCompany,
        cmpCount,
        unblockCompany,
        showRequests,
        requestAccept,
        detailsAdd,
        projectAdd,
        aboutAdd,
        viewDetails,
        addImage,
        addlogo,
        editAbout,
        detailsEdit,
        getCompany,
        addServices,
        getCompanyList,
        getProjects,
        request,
        getRequests,
        updateCategory,
        deleteCategory
    };
};
exports.companyRepositoryImpl = companyRepositoryImpl;
