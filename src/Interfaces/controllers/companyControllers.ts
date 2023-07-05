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
const jsonwebtoken=require('jsonwebtoken')
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"


const db=companyModel;
const jobdb=jobModel;
const projectdb=ProjectModel
const companyRepository=companyRepositoryImpl(db)
const JobRepository=JobRepositoryImpl(jobdb)
const ProjectRepository=ProjectRepositoryImpl(projectdb)
export const companyRegisterController=async(req:Request,res:Response)=>{
    const {cname,location,district,state,email,password,file}=req.body
    console.log("data:",req.body);
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
         
        if(company){
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


  export const projectAddController=async(req:Request,res:Response)=>{
    console.log("vvvvv",req.body);
    
    const {pname,cid,description,url}=req.body
    console.log("pname",pname);
    console.log("cid",cid);
    console.log("description",description);
    console.log("url",url);
    
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cid)
        const projects=await addProject(ProjectRepository)(cmpnyId,pname,description,url)
        console.log("projectsss",projects);
        if(projects){
            console.log("varsha");
            res.status(201).json({ message: "successful", projects });
            
            
        }
        
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
        
    }
  }
