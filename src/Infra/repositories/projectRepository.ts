import { Projects } from "../../Domain/models/Projects";
import { MongodbProject,ProjectModel } from "../database/projectModel";
import { ObjectId } from "mongoose";

export type ProjectRepository={
   create:(projects:Projects)=>Promise<Projects|null>

}

export const ProjectRepositoryImpl=(ProjectModel:MongodbProject):ProjectRepository=>{
    const create=async(project:Projects):Promise<Projects>=>{
        
        
        const createdProject=await ProjectModel.create(project)
        console.log("uuuuu");
        console.log(createdProject);
        
        return createdProject.toObject()
    }

return{
    create
}
}