import mongoose, { ObjectId, UpdateWriteOpResult } from "mongoose";
import { Projects } from "../../../Domain/models/Projects";
import { ProjectRepository,ProjectRepositoryImpl } from "../../../Infra/repositories/projectRepository";
import { companyRepository } from "../../../Infra/repositories/companyRepository";
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

export const addProject=(companyRepository:companyRepository)=>async(cid:mongoose.Types.ObjectId,projects:Array<object>):Promise<UpdateWriteOpResult>=>{
    
    const createdProject=await companyRepository.projectAdd(projects,cid)
    console.log("iiiiii");
    
    return createdProject
}

export const getProjectByName=(companyRepository:companyRepository)=>async(pname:string)=>{
    const projectss=await companyRepository.getProjects(pname)
    console.log("projectsssss",projectss);
    return projectss?projectss:null
    
}