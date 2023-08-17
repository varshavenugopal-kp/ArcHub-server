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
exports.allappliedDetails = exports.allapplied = exports.appliedjobs = exports.applied = exports.apply = void 0;
const apply = (applyRepository) => (cId, jobId, userId, details, skills, file) => __awaiter(void 0, void 0, void 0, function* () {
    const applies = {
        cId,
        jobId,
        userId,
        details,
        skills,
        file
    };
    const appliedJob = yield applyRepository.create(applies);
    return appliedJob;
});
exports.apply = apply;
// export const getApplied=(applyRepository:applyRepository)=>async(userId:mongoose.Types.ObjectId)=>{
//     const applied = await applyRepository.getApplied(userId)
//     console.log("applied",applied);
//     return applied?applied:null
// }
const applied = (applyRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const applied = yield applyRepository.getApplied(userId);
    return applied;
});
exports.applied = applied;
const appliedjobs = (applyRepository) => (userId, jobid) => __awaiter(void 0, void 0, void 0, function* () {
    const applied = yield applyRepository.getAppliedjobs(userId, jobid);
    return applied;
});
exports.appliedjobs = appliedjobs;
const allapplied = (applyRepository) => (cid) => __awaiter(void 0, void 0, void 0, function* () {
    const applied = yield applyRepository.getAllApplied(cid);
    return applied ? applied : null;
});
exports.allapplied = allapplied;
const allappliedDetails = (applyRepository) => (cid, uId) => __awaiter(void 0, void 0, void 0, function* () {
    const applied = yield applyRepository.getAllAppliedDetails(cid, uId);
    return applied ? applied : null;
});
exports.allappliedDetails = allappliedDetails;
