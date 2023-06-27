import { Request,Response } from "express";
import {userModel} from "../../Infra/database/userModel"
import { UserRepositoryImpl } from "../../Infra/repositories/userRepository";
import { signupUser } from "../../App/usecases/user/signupUse";
import { LoginUser } from "../../App/usecases/user/LoginUseCase";
// import jsonwebtoken from 'jsonwebtoken'
const jsonwebtoken=require('jsonwebtoken')
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"

const db=userModel;
const userRepository = UserRepositoryImpl(db);

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