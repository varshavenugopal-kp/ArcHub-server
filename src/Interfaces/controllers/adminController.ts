import { Request,Response } from "express";
import {adminModel} from '../../Infra/database/adminModel'
import { adminRepositoryImpl } from "../../Infra/repositories/adminRepository";
import { LoginAdmin } from "../../App/usecases/admin/Alogin";
import { UserRepositoryImpl } from "../../Infra/repositories/userRepository";
import { userModel } from "../../Infra/database/userModel";
import { showUser } from "../../App/usecases/admin/userManage";
import { companyModel } from "../../Infra/database/companyModel";
import { companyRepositoryImpl } from "../../Infra/repositories/companyRepository";
import { showCompany } from "../../App/usecases/admin/companyManage";
import { blockuser } from "../../App/usecases/admin/userBlock";
import { Unblockuser } from "../../App/usecases/admin/userUnblock";
import { blockCompany } from "../../App/usecases/admin/companyBlock";
import { unblockCompany } from "../../App/usecases/admin/companyUnblock";
import { showRequests } from "../../App/usecases/admin/Requests";
import { acceptCompany } from "../../App/usecases/admin/requestAccept";
import { categoryAdd } from "../../App/usecases/admin/CategoryAdd";
import { categoryModel } from "../../Infra/database/Category";
import { CategoryRepositoryImpl } from "../../Infra/repositories/CategoryRepository";
import { categoryList } from "../../App/usecases/admin/CategoryList";
const jsonwebtoken=require('jsonwebtoken')
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"


const db=adminModel;
const userdb=userModel;
const companydb=companyModel
const CategoryDb=categoryModel
const adminRepository=adminRepositoryImpl(db)
const userRepository=UserRepositoryImpl(userdb)
const companyRepository=companyRepositoryImpl(companydb)
const categoryRepository=CategoryRepositoryImpl(CategoryDb)

export const adminLoginController=async(req:Request,res:Response)=>{
    const {email,password}=req.body
    console.log("heeey");
    

    try{
        const admin=await LoginAdmin(adminRepository)(email,password);
        if(admin){
            const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
            const payload = {
          
                exp: expirationTime,
              };
              const token = jsonwebtoken.sign(payload, JWT_SECRET);
    
             res.json({message:"login success",admin,token})
        }else{
            res.json({ invalid:"invalid credentials" });
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
       }
}

export const showUserController=async(req:Request,res:Response)=>{
  try{
    const userData=await showUser(userRepository)();
    console.log("haai varsha",userData);
    if(userData){
        res.json({message:'Data found',userData})
    }
    

  }catch(error){
    res.json({message:'Internal server error'})
  }
}
// export const blockUserController=

export const showCompanyController=async(req:Request,res:Response)=>{
  try{
    const companyData=await showCompany(companyRepository)();
    console.log("haai varsha",companyData);
    if(companyData){
        res.json({message:'Data found',companyData})
    }
    

  }catch(error){
    res.json({message:'Internal server error'})
  }
}

export const userBlockController=async(req:Request,res:Response)=>{
  const{id}=req.body
  try{
    const blocked=await blockuser(userRepository)(id)
  }
  catch(error){
    console.log(error);
    
  }


}

export const userUnblockController=async(req:Request,res:Response)=>{
  const{id}=req.body
  try{
    const blocked=await Unblockuser(userRepository)(id)
  }
  catch(error){
    console.log(error);
    
  }





}

export const companyBlockController=async(req:Request,res:Response)=>{
  const{id}=req.body
  try{
    const blocked=await blockCompany(companyRepository)(id)
  }
  catch(error){
    console.log(error);
    
  }


}

export const companyUnblockController=async(req:Request,res:Response)=>{
  const{id}=req.body
  try{
    const blocked=await unblockCompany(companyRepository)(id)
  }
  catch(error){
    console.log(error);
    
  }


}

export const companyRequestsController=async(req:Request,res:Response)=>{
  try{
    const companyData=await showRequests(companyRepository)();
    console.log("haai varsha",companyData);
    if(companyData){
        res.json({message:'Data found',companyData})
    }
    

  }catch(error){
    res.json({message:'Internal server error'})
  }
}

export const requestAcceptController=async(req:Request,res:Response)=>{
  const{id}=req.body
  try{
    const blocked=await acceptCompany(companyRepository)(id)
  }
  catch(error){
    console.log(error);
    
  }
}
export const categoryAddController=async(req:Request,res:Response)=>{
  console.log("ccccc",req.body);
  
  const {category,file}=req.body
  console.log("category",category);

  try{
    const addedData=await categoryAdd(categoryRepository)(category,file)
    if(addedData){
      res.status(201).json({ message: "successful", addedData });
            
    }
  }catch(error){
    console.log(error);
    
    res.status(500).json({ message: "Internal server error" });
        
  }
  
}

export const categoryController=async(req:Request,res:Response)=>{
  try{
    const categories=await categoryList(categoryRepository)()
    if(categories){
      res.json({message:'Data found',categories})
    }
  }catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
}