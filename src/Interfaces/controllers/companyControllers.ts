import { Request,Response } from "express";
import {companyModel} from "../../Infra/database/companyModel"
import { signupCompany } from "../../App/usecases/Company/Csignup";
import { companyRepositoryImpl } from "../../Infra/repositories/companyRepository";
import { loginCompany } from "../../App/usecases/Company/Clogin";
const jsonwebtoken=require('jsonwebtoken')
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"


const db=companyModel;
const companyRepository=companyRepositoryImpl(db)
export const companyRegisterController=async(req:Request,res:Response)=>{
    const {cname,location,district,state,email,password}=req.body
    console.log("data:",req.body);
    try{
        const company=await signupCompany(companyRepository)(cname,location,district,state,email,password);
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
        const company=await loginCompany(companyRepository)(email,password,true);
         
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

