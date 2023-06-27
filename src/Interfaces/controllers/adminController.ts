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
const jsonwebtoken=require('jsonwebtoken')
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"


const db=adminModel;
const userdb=userModel;
const companydb=companyModel
const adminRepository=adminRepositoryImpl(db)
const userRepository=UserRepositoryImpl(userdb)
const companyRepository=companyRepositoryImpl(companydb)

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


