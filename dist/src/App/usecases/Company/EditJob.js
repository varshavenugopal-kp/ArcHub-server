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
exports.update = void 0;
const update = (JobRepository) => (jbId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const editedJob = yield JobRepository.EditJob(jbId, data);
    return editedJob;
});
exports.update = update;
// export const addServices=(companyRepository:companyRepository)=>async(cid:mongoos.Types.ObjectId,services:Array<object>):Promise<UpdateWriteOpResult>=>{
//     const createServices=await companyRepository.addServices(services,cid)
//     return createServices
// }
