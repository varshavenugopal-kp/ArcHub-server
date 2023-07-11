import mongoos from "mongoose";
import { Projects } from "../../Domain/models/Projects";
import { MongodbProject,ProjectModel } from "../database/projectModel";
// import { ObjectId } from "mongoose";
import { ObjectId } from 'mongodb';
import { viewProjects } from "../../App/usecases/Company/ViewProjects";

export type ProjectRepository={
   create:(projects:Projects)=>Promise<Projects|null>
   viewProjects:(cid:mongoos.Types.ObjectId)=>Promise<Projects|null>
}

export const ProjectRepositoryImpl=(ProjectModel:MongodbProject):ProjectRepository=>{
    const create=async(project:Projects):Promise<Projects>=>{
        
        
        const createdProject=await ProjectModel.create(project)
        console.log("uuuuu");
        console.log(createdProject);
        
        return createdProject.toObject()
    }
    const viewProjects=async(cid:mongoos.Types.ObjectId):Promise<Projects|null>=>{
      const projects=await ProjectModel.findOne({cid:cid})
      console.log("varsha",projects);
      
      return projects
    }

return{
    create,
    viewProjects
    
}
}