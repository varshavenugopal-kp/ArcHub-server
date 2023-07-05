import mongoose, { ObjectId } from "mongoose";
import { Projects } from "../../../Domain/models/Projects";
import { ProjectRepository,ProjectRepositoryImpl } from "../../../Infra/repositories/projectRepository";
export const addProject=(ProjectRepository:ProjectRepository)=>async(cid:mongoose.Types.ObjectId,pname:string,description:string,url:string[]):Promise<Projects|null>=>{
    
    
    const newProject:Projects={
        cid,
        pname,
        description,
        url
    };
    
    
    
    const createdProject=await ProjectRepository.create(newProject)
    console.log("iiiiii");
    
    return createdProject
}