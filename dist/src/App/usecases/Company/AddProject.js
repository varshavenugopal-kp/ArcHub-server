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
exports.getProjectByName = exports.addProject = void 0;
// export const addProject=(companyRepository:companyRepository)=>async(cid:mongoose.Types.ObjectId,pname:string,description:string,url:string[]):Promise<Projects|null>=>{
//     const newProject:Projects={
//         cid,
//         pname,
//         description,
//         url
//     };
//     const createdProject=await companyRepository.create(newProject)
//     console.log("iiiiii");
//     return createdProject
// }
const addProject = (companyRepository) => (cid, projects) => __awaiter(void 0, void 0, void 0, function* () {
    const createdProject = yield companyRepository.projectAdd(projects, cid);
    console.log("iiiiii");
    return createdProject;
});
exports.addProject = addProject;
const getProjectByName = (companyRepository) => (pname) => __awaiter(void 0, void 0, void 0, function* () {
    const projectss = yield companyRepository.getProjects(pname);
    console.log("projectsssss", projectss);
    return projectss ? projectss : null;
});
exports.getProjectByName = getProjectByName;
