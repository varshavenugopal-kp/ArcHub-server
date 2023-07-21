import { Request,Response } from "express";
import {companyModel} from "../../Infra/database/companyModel"
import { signupCompany } from "../../App/usecases/Company/Csignup";
import { companyRepositoryImpl } from "../../Infra/repositories/companyRepository";
import { loginCompany } from "../../App/usecases/Company/Clogin";
import { jobModel } from "../../Infra/database/jobModel";
import { JobRepositoryImpl } from "../../Infra/repositories/jobRepository";
import { addJob } from "../../App/usecases/Company/Addjob";
import { addProject } from "../../App/usecases/Company/AddProject";
import { ProjectModel } from "../../Infra/database/projectModel";
import { ProjectRepositoryImpl } from "../../Infra/repositories/projectRepository";
import mongoose from "mongoose";
import { addDetails } from "../../App/usecases/Company/addDetails";
import { addAbout } from "../../App/usecases/Company/addAbout";
import { viewDetails } from "../../App/usecases/Company/ViewDetails";
import { viewProjects } from "../../App/usecases/Company/ViewProjects";
import { addImage } from "../../App/usecases/Company/Addimage";
import { editAbout } from "../../App/usecases/Company/EditAbout";
import { editDetails } from "../../App/usecases/Company/editDetails";
import { getCategories } from "../../App/usecases/user/CategoryList";
import { categoryModel } from "../../Infra/database/Category";
import { CategoryRepositoryImpl } from "../../Infra/repositories/CategoryRepository";
import { addServices } from "../../App/usecases/Company/addService";
// import { editAbout } from "../../App/usecases/Company/EditAbout";
const jsonwebtoken=require('jsonwebtoken')
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"


const db=companyModel;
const jobdb=jobModel;
const projectdb=ProjectModel
const categorydb=categoryModel
const companyRepository=companyRepositoryImpl(db)
const JobRepository=JobRepositoryImpl(jobdb)
const ProjectRepository=ProjectRepositoryImpl(projectdb)
const categoryRepository=CategoryRepositoryImpl(categorydb)
export const companyRegisterController=async(req:Request,res:Response)=>{
    console.log(req.body)
    const {cname,location,district,state,email,password,file}=req.body
    try{
        const company=await signupCompany(companyRepository)(cname,location,district,state,email,password,file);
        if(company){
            res.status(201).json({ message: "Signup successful", company });
        }else{
            res.status(401).json({ message: "Invalid credentials" });
        }
           
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
       }
    
}

export const companyLoginController=async(req:Request,res:Response)=>{
    const {email,password}=req.body

    try{
        const company=await loginCompany(companyRepository)(email,password,true,true);
         console.log("lllooo");
         
        if(company){
            console.log("lllll");
            
            const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
            const payload = {
              
                exp: expirationTime,
              };
              const token = jsonwebtoken.sign(payload, JWT_SECRET);
    
             res.json({ message: "login successful", company ,token});
        }
        
        
        else{
             res.json({ invalid: "user not found" });
         }
        
        }catch(error){
         res.status(500).json({ message: "Internal server error" });
        }

    }

    export const jobAddController=async(req:Request,res:Response)=>{
        const{title,cId,salary,qualification,experience,deadline,type,description}=req.body
        console.log("requestt",req.body);
        
        try{
            console.log("haiii");
            let cmpnyId=new mongoose.Types.ObjectId(cId)
            const jobs=await addJob(JobRepository)(title,cmpnyId,salary,qualification,experience,deadline,type,description)
         
            if(jobs){
                console.log("hhhh");
                
                res.status(201).json({ message: "successful", jobs });
            
            }
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        
        }
    }


//   export const projectAddController=async(req:Request,res:Response)=>{
//     console.log("vvvvv",req.body);
    
//     const {pname,cid,description,url}=req.body
//     console.log("pname",pname);
//     console.log("cid",cid);
//     console.log("description",description);
//     console.log("url",url);
    
//     try{
//         let cmpnyId=new mongoose.Types.ObjectId(cid)
//         const projects=await addProject(ProjectRepository)(cmpnyId,pname,description,url)
//         console.log("projectsss",projects);
//         if(projects){
//             console.log("varsha");
//             res.status(201).json({ message: "successful", projects });
            
            
//         }
        
//     }catch(error){
//         res.status(500).json({ message: "Internal server error" });
        
//     }
//   }


export const projectAddController=async(req:Request,res:Response)=>{
    console.log("vvvvv",req.body);
    
    const {cid,...projects}=req.body
    // console.log("pname",pname);
    console.log("cid",cid);
    // console.log("description",description);
    // console.log("url",url);
    
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cid)
        const projectss=await addProject(companyRepository)(cmpnyId,projects)
        console.log("projectsss",projectss);
        if(projectss){
            console.log("varsha");
            res.status(201).json({ message: "successful", projects });
            
            
        }
        
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
        
    }
  }



  export const detailsAddController=async(req:Request,res:Response)=>{
    console.log("moynthpranav",req.body);
    
    const {cId,datas}=req.body
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cId)
       const details=await addDetails(companyRepository)(cmpnyId,datas)
       console.log("detailssss",details);
       
       if(details){
        console.log("varsha");
        res.status(201).json({ message: "successful", details });
        
        
    }
    }
    catch(error){
        res.status(500).json({ message: "Internal server error" });
        
    }
   

}


export const aboutAddController=async(req:Request,res:Response)=>{
    console.log("moynthadhin",req.body);
    
    const {cId}=req.body
    const {description}=req.body
    console.log("about",description);
    
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cId)
       const details=await addAbout(companyRepository)(cmpnyId,description)
       console.log("detailssss",details);
       
       if(details){
        console.log("varsha");
        res.status(201).json({ message: "successful", details });
    }
    }
    catch(error){
        res.status(500).json({ message: "Internal server error" });
        
    }
   

}

export const detailsController=async(req:Request,res:Response)=>{
    const cId=req.params.cid
    console.log("params:",cId);
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cId)
        const details=await viewDetails(companyRepository)(cmpnyId)
        if(details){
            console.log("varshaaaaaayyyyyyyyyyy",details);
            res.status(201).json({ message: "successful", details });
        }
        }
        catch(error){
            res.status(500).json({ message: "Internal server error" });
            
        }
       
    
    }

   export const projectController=async(req:Request,res:Response)=>{
    const cId=req.params.cid
    console.log("cmpid",cId);
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cId)
        const projects=await viewProjects(ProjectRepository)(cmpnyId)
        if(projects){
            console.log("projects",projects);
            res.status(201).json({ message: "successful", projects });
            
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
           
    }
    
   }
   
   export const imageAddController=async(req:Request,res:Response)=>{
    const url=req.body
    const cid=req.params.cid
    console.log('url:',url);
    console.log("iiidddsss",cid);
    
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cid)
        let image=await addImage(companyRepository)(cmpnyId,url.fileUrl)
        if(image){
            console.log("kjkjkjkj",image);
            
            res.status(201).json({ message: "successful", image });
        
        }
    }
    catch(error){
        res.status(500).json({ message: "Internal server error" });
        
    }
   }

   

   export const detailsEditController=async(req:Request,res:Response)=>{
    const cId=req.params.cid
    console.log("params:",cId);
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cId)
        const details=await viewDetails(companyRepository)(cmpnyId)
        if(details){
            console.log("ajaaaayyyy",details);
            res.status(201).json({ message: "successful", details });
        }
        }
        catch(error){
            res.status(500).json({ message: "Internal server error" });
            
        }
       

}

export const getAboutController=async(req:Request,res:Response)=>{
    const cId=req.params.cid
    console.log("Id here",cId);
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cId)
        const details=await viewDetails(companyRepository)(cmpnyId)
        if(details){
            console.log("varshhhha",details);
            res.status(201).json({ message: "successful", details });
        }
        }
        catch(error){
            res.status(500).json({ message: "Internal server error" });
              
    }
    
}

export const EditAboutController=async(req:Request,res:Response)=>{
    const {data,cid}=req.body
    console.log("this is about",cid);
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cid)
        const about=await editAbout(companyRepository)(cmpnyId,data)
        if(about){
            console.log("ahhhh",about);
            res.status(201).json({ message: "successful", about });
        }
        }
        catch(error){
            res.status(500).json({ message: "Internal server error" });
            
        }
    
}
 export const categoryController=async(req:Request,res:Response)=>{
    try{
        const categories=await getCategories(categoryRepository)()
        if(categories){
            res.json({message:'Data found',categories})
          }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
 }
    
export const serviceController=async(req:Request,res:Response)=>{
   
   const {cid,...categories}=req.body
   console.log("how are you",categories);
   
   try{
    let cmpId=new mongoose.Types.ObjectId(cid)
    const services=await addServices(companyRepository)(cmpId,categories)
       console.log("detailssss",services);
       
       if(services){
        console.log("varsha");
        res.status(201).json({ message: "successful", services });
        
        
    }
    }
    catch(error){
        res.status(500).json({ message: "Internal server error" });
        
    }
   

}
export const getServiceController=async(req:Request,res:Response)=>{
    const cId=req.params.cid
    console.log("cmpid",cId);
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cId)
        const services=await viewDetails(companyRepository)(cmpnyId)
        if(services){
            console.log("projects",services);
            res.status(201).json({ message: "successful", services });
            
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
           
    }
}