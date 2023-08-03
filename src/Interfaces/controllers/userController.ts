import { Request,Response } from "express";
import {userModel} from "../../Infra/database/userModel"
import { UserRepositoryImpl } from "../../Infra/repositories/userRepository";
import { signupUser } from "../../App/usecases/user/signupUse";
import { CheckUser, LoginUser, passwordReset } from "../../App/usecases/user/LoginUseCase";
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
const otpSender = require('node-otp-sender');
import { getjob } from "../../App/usecases/user/Getjob";
import { getCompany } from "../../App/usecases/user/companyShow";
import { getId } from "../../App/usecases/user/GetId";
import { AppliedModel } from "../../Infra/database/AppliedModel";
import { applyRepositoryImpl } from "../../Infra/repositories/applyRepository";
import { applied, apply } from "../../App/usecases/user/Apply";
import { addBookmark } from "../../App/usecases/user/AddBookmark";
import { removeBookmark } from "../../App/usecases/user/removeBookmark";
import { getSaved } from "../../App/usecases/user/getSaved";
import { getCompanies } from "../../App/usecases/user/getCategoryWise";
import { getProjectByName } from "../../App/usecases/Company/AddProject";
import { updateImage } from "../../App/usecases/user/AddProfile";
import { getUser } from "../../App/usecases/admin/userManage";
// import { getProjectByName } from "../../App/usecases/Company/ViewProjects";

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
   const {fname,lname,email,password,isGoogle}=req.body
   console.log("hiii=",req.body);
   
  //  console.log("helllo");
   
   try{
    const user=await signupUser(userRepository)(fname,lname,email,password,isGoogle);
    console.log("user",user);
    
    if(user){
        res.status(201).json({ message: "Signup successful", user });
       
    }else{
       
        res.status(401).json({ message: "Invalid credentials" });
    }
   
   }catch(error){
    console.log('err=',error);
    
    res.status(500).json({ message: "Internal server error" });
   }
}

export const userLoginController=async(req:Request,res:Response)=>{
    const {email,password}=req.body
    console.log("hii=",req.body);
    console.log('jjj=',email);
    console.log("nvnvvn",password);
    
    
    // console.log("helllo");
    
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
      console.log('errrrr=',error);
      
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
  const {firstName,lastName,email,phone,qualification,experience,skills,jobid,cid,file,userId}=req.body
  console.log("lklklklkllklkllklkllklll",cid);
  console.log("lklklklkllklkllklkllklll",jobid);
  console.log("lklklklkllklkllklkllklll",userId);
  
   try{
    let cmpnyId=new mongoose.Types.ObjectId(cid)
    const userid=new mongoose.Types.ObjectId(userId)
    const jobId=new mongoose.Types.ObjectId(jobid)
    const details={
       firstName:firstName,
       lastName:lastName,
       email:email,
       phone:phone,
       qualification:qualification,
       experience:experience
    }
    const job=await apply(applyRepository)(cmpnyId,jobId,userid,details,skills,file)
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
    let userId=new mongoose.Types.ObjectId(uid)
    const jobid=new mongoose.Types.ObjectId(jobId)
    const jobs=await addBookmark(jobRepository)(jobid,userId)
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
      const uId=req.params.userid
      try{
        // let userId=new mongoose.Types.ObjectId(uId)
    //  const jobid=new mongoose.Types.ObjectId(jobId)
      const getJobs=await getSaved(jobRepository)(uId)
      if(getJobs){
        res.json({message:'Data found',getJobs})
      }
      }catch(error){

      }

    }

    // export const getAppliedController=async(req:Request,res:Response)=>{
    //    const userid=req.params.userid
    //    console.log('jjj',userid);
    //    const userId=new mongoose.Types.ObjectId(userid)
    //    const appliedJobs=await getApplied(applyRepository)(userId)
    //    console.log("lalalaaa",appliedJobs);
    //    if(appliedJobs){
    //     res.json({message:'Data found',appliedJobs})
    //    }
       
    // }

    export const getAppliedController=async(req:Request,res:Response)=>{
      console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
      
      const userid=req.params.userid
      console.log("nnnnnnnnnnnnnn",userid);
      
     const userId=new mongoose.Types.ObjectId(userid)
     const getApplied=await applied(applyRepository)(userId)
     console.log(getApplied,"kkkk");

     if(getApplied){
      res.json({message:'Data found',getApplied})
    }
     

      

    }

    export const getcatWiseController=async(req:Request,res:Response)=>{
      const {category}=req.body
      const company=await getCompanies(companyRepository)(category)
      console.log("gott",company);
      if(company){
        res.json({message:'Data found',company})
      }
      
    }

    export const getProjectController=async(req:Request,res:Response)=>{
      const {id}=req.params
      console.log("enthaaaavooo",id);
      
      const projects=await getProjectByName(companyRepository)(id)
      console.log("gott",projects);
      if(projects){
        res.json({message:'Data found',projects:projects[0].projects})
      }
    }

    export const profilePicController=async(req:Request,res:Response)=>{
      console.log(req.body,"hhehhee");
      
      const image=req.body.files
      const userid=req.params.userid
      console.log("heyy",image);
      console.log("yooo",userid);
      
      
      try{
        let userId=new mongoose.Types.ObjectId(userid)
        console.log("heyy",userid);
      const imagee=await updateImage(userRepository)(userId,image)
      if(imagee){
        console.log("kjkjkjkj",imagee);
        
        res.status(201).json({ message: "successful", imagee });
    
    }
  }catch(error){
      console.log(error);
      
    }   
    }

   export const userInfoController=async(req:Request,res:Response)=>{
     const id=req.params.userid
     try{
      let userId=new mongoose.Types.ObjectId(id)
      let userData=await getUser(userRepository)(userId)
      if(userData){
        res.json({message:'Data found',profile:userData.image})
      }
     }catch(error){
       
     }
   }

   export const checkStudForOtp = async(req:Request,res:Response)=>{
    try{
        const email = req.body.email;
        console.log('em=',email);
        const emailCheck = await CheckUser(userRepository)(email);
        if(emailCheck){
            const senderEmail = `${process.env.REACT_APP_SENDER_EMAIL}`;
            const senderPassword = `${process.env.REACT_APP_SENDER_PASSWORD}`;
            const recipientEmail = email;
            const subject = 'OTP Verification';
            otpSender(senderEmail, senderPassword, recipientEmail, subject)
                .then((response:any) => {
                    console.log(response);
                    res.status(201).json({message:'Email exist',emailExist:true,otp:response.otp}) 
                })
                .catch((error:any) => {
                    console.error('Error:', error);
                });

            
        }
        else{
            res.json({message:'Email doesnot exist!',emaiExist:false}) 
        }
        
    }catch(error){
        console.log("err=",error);
        
        res.status(500).json({ message: "Internal server error"});
    } 
}

export const resestPassword = async(req:Request,res:Response)=>{
  try{
   const {email,password} = req.body;
   console.log('email=',email);
   console.log('password=',password);
   const result = await passwordReset(userRepository)(email,password);
   if(result){
      res.status(201).json({message:'Password reset successfull',result}) 
  }
  else{
      res.json({message:'Invalid datas'})
  }
  }catch(error){
      console.log("err=",error);
      
      res.status(500).json({ message: "Internal server error"});
  } 
} 



