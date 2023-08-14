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
exports.JobRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const JobRepositoryImpl = (jobModel) => {
    const create = (job) => __awaiter(void 0, void 0, void 0, function* () {
        const createJob = yield jobModel.create(job);
        return createJob.toObject();
    });
    const getJobs = () => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield jobModel.aggregate([{ $lookup: { from: "companies", localField: "cId", foreignField: "_id", as: "cmpInfo" } }]);
        console.log(jobs, "moynt");
        return jobs;
    });
    const jobList = (cid) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield jobModel.aggregate([{ $match: { cId: cid } }, { $lookup: { from: "companies", localField: "cId", foreignField: "_id", as: "cmpInfo" } }]);
        console.log(jobs, "moynt");
        return jobs;
    });
    const getJob = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield jobModel.aggregate([{ $match: { _id: jobId } }, { $lookup: { from: "companies", localField: "cId", foreignField: "_id", as: "cmpInfo" } }]);
        console.log("varsha", jobs);
        return jobs;
    });
    const EditJob = (jobId, jobs) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("lllklklklkk", jobs);
        const jobEdit = yield jobModel.updateOne({ _id: jobId }, { $set: { title: jobs.title, salary: jobs.salary, qualification: jobs.qualification, experience: jobs.experience, deadline: jobs.deadline, type: jobs.type, description: jobs.description } });
        return jobEdit;
        // try{
        //     const jobedit=await jobModel.findByIdAndUpdate({_id:jobId},{$set:{jobs},},{new:true});
        //     return null;
        // }catch(error){
        //     return null;
        // }
    });
    const getId = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield jobModel.findOne({ _id: jobId });
        console.log("varsha", jobs);
        return jobs;
    });
    const bookmark = (jobId, uId) => __awaiter(void 0, void 0, void 0, function* () {
        const bookmarkedJob = yield jobModel.updateOne({ _id: jobId }, { $push: { bookmarks: uId } });
        console.log("good spirit pls come", bookmarkedJob);
        return bookmarkedJob;
    });
    const removebookmark = (jobId, uId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(jobId);
        const removebookmarkedJob = yield jobModel.updateOne({ _id: jobId }, { $pull: { bookmarks: new mongoose_1.default.Types.ObjectId(uId) } });
        console.log("good spirit pls come", removebookmarkedJob);
        return removebookmarkedJob;
    });
    const getSaved = (uId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("uid:", uId);
        const jobs = yield jobModel.aggregate([
            {
                $match: {
                    bookmarks: { $in: [new mongoose_1.default.Types.ObjectId(uId)] }
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'uid',
                    foreignField: '_id',
                    as: 'saved'
                }
            }
        ]);
        return jobs;
    });
    return {
        create,
        getJobs,
        jobList,
        getJob,
        EditJob,
        getId,
        bookmark,
        removebookmark,
        getSaved
    };
};
exports.JobRepositoryImpl = JobRepositoryImpl;
