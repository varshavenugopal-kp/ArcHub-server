import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { Projects } from "../../../Domain/models/Projects";
import { ProjectRepository } from "../../../Infra/repositories/projectRepository";

export const viewProjects=(ProjectRepository:ProjectRepository)=>async(cid:mongoos.Types.ObjectId)=>{
    const projects=await ProjectRepository.viewProjects(cid)
    console.log("projectsss",projects);
    return projects?projects:null
    
}

