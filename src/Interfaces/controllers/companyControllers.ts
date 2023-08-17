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
const nodemailer = require('nodemailer');
import { addDetails } from "../../App/usecases/Company/addDetails";
import { addAbout } from "../../App/usecases/Company/addAbout";
import { viewDetails } from "../../App/usecases/Company/ViewDetails";
import { viewProjects } from "../../App/usecases/Company/ViewProjects";
import { addImage, addlogo } from "../../App/usecases/Company/Addimage";
import { editAbout } from "../../App/usecases/Company/EditAbout";
import { editDetails, getUpdatedCategory, getdeletedCategory } from "../../App/usecases/Company/editDetails";
import { getCategories } from "../../App/usecases/user/CategoryList";
import { categoryModel } from "../../Infra/database/Category";
import { CategoryRepositoryImpl } from "../../Infra/repositories/CategoryRepository";
import { addServices } from "../../App/usecases/Company/addService";
import { getJobs, jobList } from "../../App/usecases/user/Joblist";
import { getjob } from "../../App/usecases/user/Getjob";
import { update } from "../../App/usecases/Company/EditJob";
import { allapplied, allappliedDetails, applied } from "../../App/usecases/user/Apply";
import { AppliedModel } from "../../Infra/database/AppliedModel";
import { applyRepositoryImpl } from "../../Infra/repositories/applyRepository";
import { getCompany } from "../../App/usecases/user/companyShow";
import { getRequests } from "../../App/usecases/Company/Requests";
// import { updateJob } from "../../App/usecases/Company/EditJob";
// import { editAbout } from "../../App/usecases/Company/EditAbout";
const jsonwebtoken=require('jsonwebtoken')
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"


const db=companyModel;
const jobdb=jobModel;
const projectdb=ProjectModel
const categorydb=categoryModel
const applydb=AppliedModel
const companyRepository=companyRepositoryImpl(db)
const JobRepository=JobRepositoryImpl(jobdb)
const ProjectRepository=ProjectRepositoryImpl(projectdb)
const categoryRepository=CategoryRepositoryImpl(categorydb)
const applyRepository=applyRepositoryImpl(applydb)
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
        console.log(error);
        
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
        const projects=await viewDetails(companyRepository)(cmpnyId)
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


   export const logoAddController=async(req:Request,res:Response)=>{
    const url=req.body.logo
    const cid=req.params.cid
    console.log('url:',url);
    console.log("iiidddsssloogoooo",cid);
    console.log("microsoft",url);
    
    
    try{
        let cmpnyId=new mongoose.Types.ObjectId(cid)
        let logo=await addlogo(companyRepository)(cmpnyId,url)
        if(logo){
            console.log("kjkjkjkj",logo);
            
            res.status(201).json({ message: "successful", logo });
        
        }
    }
    catch(error){
        // res.status(500).json({ message: "Internal server error" });
        console.log(error);
        
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
export const JobListController=async(req:Request,res:Response)=>{
    try{
        const jobs=await getJobs(JobRepository)()
        if(jobs){
            res.json({message:'Data found',jobs})
          }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
      }
}
export const listJobController=async(req:Request,res:Response)=>{
    const cid=req.params.cid
    const cId=new mongoose.Types.ObjectId(cid)
    try{
        const jobs=await jobList(JobRepository)(cId)
        console.log("jobs listed",jobs);
        
        if(jobs){
            res.json({message:'Data found',jobs})
          }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
      }
}


export const singleJobController=async(req:Request,res:Response)=>{
    const jobId=req.params.jobId
    try{
      let id=new mongoose.Types.ObjectId(jobId)
        const jobs=await getjob(JobRepository)(id)
        if(jobs){
            res.json({message:'Data found',jobs})
          }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
      }
}

export const jobEditController=async(req:Request,res:Response)=>{
   const{jobId,...data}=req.body
   console.log("id aaaayaaa",jobId);
//    console.log("this is req.body",title);
       console.log("yeee",data);
       
   try{
    // let jobid=new mongoose.Types.ObjectId
    // const jobs=await updateJob(JobRepository)(jobId,data)
    let jbId=new mongoose.Types.ObjectId(jobId)
    const jobs=await update(JobRepository)(jbId,data)
       console.log("jobs edited",jobs);
       
    //    if(services){
    //     console.log("varsha");
    //     res.status(201).json({ message: "successful", services });
        
        
    }
   catch(error){

   }

  
   

}

export const getAppliedsController=async(req:Request,res:Response)=>{
    console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
    
    const cid=req.params.cid
    console.log("nnnnnnnnnnnnnn",cid);
    
   const cId=new mongoose.Types.ObjectId(cid)
   const getApplied=await allapplied(applyRepository)(cId)
   console.log(getApplied,"kkkk");

   if(getApplied){
    res.json({message:'Data found',getApplied})
  }
}

export const getAppliedDetailsController=async(req:Request,res:Response)=>{
    console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
    
    const cid=req.params.cid
    const userId=req.query.userId as string
    console.log("nnnnnnnnnnnnnnIdddddddddd",userId);
    
   const cId=new mongoose.Types.ObjectId(cid)
   const uId=new mongoose.Types.ObjectId(userId)
   const getApplied=await allappliedDetails(applyRepository)(cId,uId)
   console.log(getApplied,"kkkk");

   if(getApplied){
    res.json({message:'Data found',getApplied})
  }
}


export const getInfoController=async(req:Request,res:Response)=>{
    console.log("sdfghjkjhgcvjvcvhjhgcjhgchjhc");
    
    const cid=req.params.cid
    console.log("nnnnnnnnnnnnnn",cid);
    
   const cId=new mongoose.Types.ObjectId(cid)
   const info=await getCompany(companyRepository)(cId)
   console.log(info,"kkkk");

   if(info){
    res.json({message:'Data found',info})
  }
}

export const getcompanyDashboard=async(req:Request,res:Response)=>{
    const cid=req.params.cid
    const cId=new mongoose.Types.ObjectId(cid)
    try{
      const projects=await viewDetails(companyRepository)(cId)
      const projectCount=projects?.projects?.length
      console.log("project",projectCount);
      const services=await viewDetails(companyRepository)(cId)
      const servicesCount=services?.services?.length
      console.log("service",servicesCount);
      const applications=await allapplied(applyRepository)(cId)
      const applicationCount=applications?.length
      console.log("applied",applicationCount);
      const allJobs=await jobList(JobRepository)(cId)
      const jobCount=allJobs?.length
      console.log("jobs",jobCount);
      console.log();
      
      res.json({message:'Data found',projectCount,servicesCount,applicationCount,jobCount})

    }catch(error){

    }
}

export const sendEmail=async(req:Request,res:Response)=>{
    const { email, companyemail } = req.body;
    try {
        // Configure Nodemailer with your email service credentials
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Replace with your email service provider (e.g., Gmail, Outlook, etc.)
          auth: {
            user: 'decorafurniture61@gmail.com', // Replace with your email address
            pass: process.env.EMAIL_PASSWORD, // Replace with your email password or an app-specific password
          },
        });
    
        // Send the email
        const info = await transporter.sendMail({
          from: 'decorafurniture61@gmail.com', // Use the sender's email as the "from" address
          to: 'varshavenugopal642@gmail.com',
          subject: 'Congratulations! You have Been Shortlisted for this position ',
          text: 'We hope this email finds you well. We are pleased to inform you that you have been shortlisted for the position. Your application and qualifications have impressed our hiring team, and we would like to invite you to the next stage of the selection process.', // You can customize the email content here
        });
    
        console.log('Email sent:', info);
        
        res.json({ success: true });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Error sending email' });
      }
    };

    export const getRequestsController=async(req:Request,res:Response)=>{
        const cid=req.params.cid
        console.log("cmpId",cid);
        try{
            const cId=new mongoose.Types.ObjectId(cid)
            const requests=await getRequests(companyRepository)(cId)
            if(requests){
                res.json({requests});
            }
        }catch{
            
        }
        
    }
    export const  serviceEdit=async(req:Request,res:Response)=>{
        const {details,categories,cid}=req.body
        console.log("serrrviicessss",details);
        const category=categories.category
        console.log("serrrviicessss",category);
        console.log("serrrviicessss",cid);
        
        try{
            const cId=new mongoose.Types.ObjectId(cid)
            const updateddata=await getUpdatedCategory(companyRepository)(cId,category,details)
            if(updateddata){
                res.json({updateddata})
            }
        }catch(error){

        }
    }
    export const  serviceDelete=async(req:Request,res:Response)=>{
        const {details,categories,cid}=req.body
        console.log("deleeet",details);
        const category=categories.category
        console.log("delete",categories);
        console.log("delete",cid);
        
        try{
            const cId=new mongoose.Types.ObjectId(cid)
            const deleteddata=await getdeletedCategory(companyRepository)(cId,category,details)
            if(deleteddata){
                res.json({deleteddata})
            }
        }catch(error){

        }
    }
