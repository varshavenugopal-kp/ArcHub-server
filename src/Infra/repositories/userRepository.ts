// import { Model, Document, ObjectId } from 'mongoose';
import { User } from '../../Domain/models/User';
import { MongoDbUser, userModel } from '../database/userModel';
import { showUser } from '../../App/usecases/admin/userManage';
import { ObjectId } from 'mongodb';
import { UpdateWriteOpResult } from "mongoose";
import mongoos from "mongoose";
 

interface updateResult{
  acknowledged:boolean
  modifiedCount:number
  upsertedId:ObjectId|null
  upsertedCount:number
  matchedCount:number
}
export type UserRepository={
    create: (user: User) => Promise<User|null>;
    LoginUser:(email:string)=>Promise<User|null>
    showUser:()=>Promise<User[]>
    blockUser(id:string):Promise<User|void|updateResult>
    UnblockUser(id:string):Promise<User|void|updateResult>
    addProImage(id:mongoos.Types.ObjectId,img:string):Promise<UpdateWriteOpResult>
    getSingleUser(id:mongoos.Types.ObjectId):Promise<User|null>
    resetPassword(email:string,password:string): Promise< UpdateWriteOpResult >;
 }

 export const UserRepositoryImpl=(userModel:MongoDbUser):UserRepository=>{
    const create = async (user: User): Promise<User> => {
    const createdUser=await userModel.create(user);
    return createdUser.toObject();
    };

    const LoginUser=async (email:string):Promise<User|null>=>{
      console.log("klklklk",email);
      
      const userCheck=await userModel.findOne({email});
      console.log("oooooooo",userCheck);
      
      return userCheck?userCheck.toObject():null;

      
    };
    
    const showUser=async():Promise<User[]>=>{
      const userData=await userModel.find();
      console.log("userData",userData);
      
      return userData.map((user)=>user.toObject())
    };

    const blockUser=async (id:string):Promise<User|void|updateResult>=>{
      const result=await userModel.updateOne({_id:new ObjectId(id)},{$set:{status:false}})
      return result
    }

    const UnblockUser=async (id:string):Promise<User|void|updateResult>=>{
      const result=await userModel.updateOne({_id:new ObjectId(id)},{$set:{status:true}})
      return result
    }
    const addProImage=async(id:mongoos.Types.ObjectId,img:string):Promise<UpdateWriteOpResult>=>{
      console.log("pranav",id);
      
      const result=await userModel.updateOne({ _id:id}, { $set: {image:img } })
      console.log("added",result);
      
      return result
    }
     const getSingleUser=async(id:mongoos.Types.ObjectId):Promise<User|null>=>{
      const usersData=await userModel.findOne({_id:id});
      return usersData
    }
    const resetPassword = async(email:string,password:string): Promise<UpdateWriteOpResult >=>{
      const result = await userModel.updateOne({email:email},{$set:{password:password}});
      if(result.modifiedCount>0){
          console.log('Password reset successful');
          return result
        } 
        return result
  }

    return{
      create,
      LoginUser,
      showUser,
      blockUser,
      UnblockUser,
      addProImage,
      getSingleUser,
      resetPassword
    }
 }



