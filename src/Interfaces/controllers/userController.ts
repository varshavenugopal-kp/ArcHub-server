import { Request,Response } from "express";
import {userModel} from "../../Infra/database/userModel"
import { UserRepositoryImpl } from "../../Infra/repositories/userRepository";
import { signupUser } from "../../App/usecases/user/signupUse";
import { LoginUser } from "../../App/usecases/user/LoginUseCase";
import { categoryModel } from "../../Infra/database/Category";
import { CategoryRepositoryImpl } from "../../Infra/repositories/CategoryRepository";
import { getCategories } from "../../App/usecases/user/CategoryList";
import { jobModel } from "../../Infra/database/jobModel";
import { JobRepositoryImpl } from "../../Infra/repositories/jobRepository";
import { getJobs } from "../../App/usecases/user/Joblist";
import { showCompany } from "../../App/usecases/admin/companyManage";
import { companyModel } from "../../Infra/database/companyModel";
import { companyRepositoryImpl } from "../../Infra/repositories/companyRepository";
import mongoose from "mongoose";
import { getjob } from "../../App/usecases/user/Getjob";
import { getCompany } from "../../App/usecases/user/companyShow";
import { getId } from "../../App/usecases/user/GetId";
import { AppliedModel } from "../../Infra/database/AppliedModel";
import { applyRepositoryImpl } from "../../Infra/repositories/applyRepository";
import { apply } from "../../App/usecases/user/Apply";
import { addBookmark } from "../../App/usecases/user/AddBookmark";
import { removeBookmark } from "../../App/usecases/user/removeBookmark";
import { getSaved } from "../../App/usecases/user/getSaved";
// import jsonwebtoken from 'jsonwebtoken'
const jsonwebtoken=require('jsonwebtoken')
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"

const db=userModel;
const catDb=categoryModel
const jobDb=jobModel
const cmpdb=companyModel
const applydb=AppliedModel

const userRepository = UserRepositoryImpl(db);
const companyRepository=companyRepositoryImpl(cmpdb)
const categoryRepository=CategoryRepositoryImpl(catDb)
const jobRepository=JobRepositoryImpl(jobDb)
const applyRepository=applyRepositoryImpl(applydb)

export const userSignupController=async(req:Request,res:Response)=>{
   const {fname,lname,email,password}=req.body
   console.log(req.body);
   
   console.log("helllo");
   
   try{
    const user=await signupUser(userRepository)(fname,lname,email,password);
    console.log("user",user);
    
    if(user){
        res.status(201).json({ message: "Signup successful", user });
       
    }else{
       
        res.status(401).json({ message: "Invalid credentials" });
    }
   
   }catch(error){
    res.status(500).json({ message: "Internal server error" });
   }
}

export const userLoginController=async(req:Request,res:Response)=>{
    const {email,password}=req.body
    console.log(req.body);
    
    console.log("helllo");
    
    try{
     const user=await LoginUser(userRepository)(email,password);
     console.log("user",user);
     
     if(user){
        const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
        const payload = {
          
            exp: expirationTime,
          };
          const token = jsonwebtoken.sign(payload, JWT_SECRET);

         res.json({ message: "login successful", user ,token});
    }
    
    
    else{
         res.json({ invalid: "user not found" });
     }
    
    }catch(error){
     res.status(500).json({ message: "Internal server error" });
    }
 }

 export const getCategoryController=async(req:Request,res:Response)=>{
    try{
        const categories=await getCategories(categoryRepository)()
        if(categories){
            res.json({message:'Data found',categories})
          }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
      }
 }



 export const getjobController=async(req:Request,res:Response)=>{
    try{
        const jobs=await getJobs(jobRepository)()
        if(jobs){
            res.json({message:'Data found',jobs})
          }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
      }
 }

 export const getCompanylistController=async(req:Request,res:Response)=>{
    try{
      const companyData=await showCompany(companyRepository)();
      console.log("haai varsha",companyData);
      if(companyData){
          res.json({message:'Data found',companyData})
      }
    }
    catch(error){
      console.log(error);
      
    }
 
  }

  export const getCompanyController=async(req:Request,res:Response)=>{
    const cid=req.params.cid
    console.log("id here?",cid);    
    
    try{
      let id=new mongoose.Types.ObjectId(cid)
      const companies=await getCompany(companyRepository)(id)
      if(companies){
          res.json({message:'Data found',companies})
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
      }
 }


  export const getjobDetailsController=async(req:Request,res:Response)=>{
    const jobId=req.params.jobId
    try{
      let id=new mongoose.Types.ObjectId(jobId)
        const jobs=await getjob(jobRepository)(id)
        if(jobs){
            res.json({message:'Data found',jobs})
          }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
      }
 }

 export const getIdController=async(req:Request,res:Response)=>{
   const  jobId=req.params.jobId
   console.log("is this jobId here?",jobId);
   try{
    let id=new mongoose.Types.ObjectId(jobId)
      const jobs=await getId(jobRepository)(id)
      if(jobs){
          res.json({message:'Data found',id:jobs.cId})
        }
  }catch(error){
      res.status(500).json({ message: "Internal server error" });
    }
 }
 export const appliedController=async(req:Request,res:Response)=>{
  console.log("pleaaase comee",req.body);
  const {firstName,lastName,email,phone,qualification,experience,skills,jobid,cid,file}=req.body
  console.log("lklklklkllklkllklkllklll",cid);
  console.log("lklklklkllklkllklkllklll",jobid);
  
   try{
    let cmpnyId=new mongoose.Types.ObjectId(cid)
    const jobId=new mongoose.Types.ObjectId(jobid)
    const details={
       firstName:firstName,
       lastName:lastName,
       email:email,
       phone:phone,
       qualification:qualification,
       experience:experience
    }
    const job=await apply(applyRepository)(cmpnyId,jobId,details,skills,file)
    console.log("here is the jobs",job);
    if(job){
      res.status(201).json({ message: "successful", job });
    }
    
   }
   catch(error){
    res.status(500).json({ message: "Internal server error" });
   }
 }
 export const bookmarkController=async(req:Request,res:Response)=>{
   const {jobId,uid}= req.body
   console.log("blaablaa",jobId);
   console.log("runnnn",uid);
   
   
   try{
    // let userId=new mongoose.Types.ObjectId(uId)
    const jobid=new mongoose.Types.ObjectId(jobId)
    const jobs=await addBookmark(jobRepository)(jobid,uid)
    if(jobs){
      res.json({message:'Data found',jobs})
    }
    }catch(error){
      res.status(500).json({ message: "Internal server error" });
    }
   }

   export const removeBookmarkController=async(req:Request,res:Response)=>{
    const {jobId,uid}= req.body
    console.log("blaablaa",jobId);
    console.log("runnnn",uid);
    
    
    try{
     // let userId=new mongoose.Types.ObjectId(uId)
     const jobid=new mongoose.Types.ObjectId(jobId)
     const jobs=await removeBookmark(jobRepository)(jobid,uid)
     if(jobs){
       res.json({message:'Data found',jobs})
     }
     }catch(error){
       res.status(500).json({ message: "Internal server error" });
     }
    }

    export const getSavedController=async(req:Request,res:Response)=>{
      const {jobId,uId}=req.body
      try{
        // let userId=new mongoose.Types.ObjectId(uId)
     const jobid=new mongoose.Types.ObjectId(jobId)
      const getJobs=await getSaved(jobRepository)(uId)
      }catch(error){

      }

    }

 
