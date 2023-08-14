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
exports.applyRepositoryImpl = void 0;
const applyRepositoryImpl = (AppliedModel) => {
    const create = (applies) => __awaiter(void 0, void 0, void 0, function* () {
        const appliedJobs = yield AppliedModel.create(applies);
        return appliedJobs.toObject();
    });
    const getApplied = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield AppliedModel.aggregate([{ $match: { userId: userId } },
            {
                $lookup: { from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'appliedjobs'
                }
            }]);
        return jobs;
        // const jobs=await AppliedModel.find({userId:userId})
        //   console.log("fhghgh")
        //   return jobs
    });
    const getAllApplied = (cid) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield AppliedModel.aggregate([{ $match: { cId: cid } },
            {
                $lookup: { from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'appliedjobs'
                }
            }]);
        return jobs;
        // const jobs=await AppliedModel.find({userId:userId})
        //   console.log("fhghgh")
        //   return jobs
    });
    const getAllAppliedDetails = (cid, uId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield AppliedModel.aggregate([{ $match: { cId: cid, userId: uId } },
            {
                $lookup: { from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'appliedjobs'
                }
            }]);
        return jobs;
        // const jobs=await AppliedModel.find({userId:userId})
        //   console.log("fhghgh")
        //   return jobs
    });
    return {
        create,
        getApplied,
        getAllApplied,
        getAllAppliedDetails
    };
};
exports.applyRepositoryImpl = applyRepositoryImpl;
