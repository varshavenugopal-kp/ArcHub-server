import { Model, Document } from 'mongoose';
import { Admin } from '../../Domain/models/Admin';
import { mongodbAdmin,adminModel } from '../database/adminModel';

export type adminRepository={
    
    LoginAdmin:(email:string)=>Promise<Admin|null>

 }

 export const adminRepositoryImpl=(userModel:mongodbAdmin):adminRepository=>{
    

    const LoginAdmin=async (email:string):Promise<Admin|null>=>{
      const adminCheck=await adminModel.findOne({email});
      console.log("aaaaaaa",adminCheck);
      
      return adminCheck?adminCheck.toObject():null;
      
    }
    return{
     
      LoginAdmin
    }
 }