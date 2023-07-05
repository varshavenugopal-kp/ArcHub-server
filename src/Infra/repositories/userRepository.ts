// import { Model, Document, ObjectId } from 'mongoose';
import { User } from '../../Domain/models/User';
import { MongoDbUser, userModel } from '../database/userModel';
import { showUser } from '../../App/usecases/admin/userManage';
import { ObjectId } from 'mongodb';
 

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
   
 }

 export const UserRepositoryImpl=(userModel:MongoDbUser):UserRepository=>{
    const create = async (user: User): Promise<User> => {
    const createdUser=await userModel.create(user);
    return createdUser.toObject();
    };

    const LoginUser=async (email:string):Promise<User|null>=>{
      const userCheck=await userModel.findOne({email});
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

    return{
      create,
      LoginUser,
      showUser,
      blockUser,
      UnblockUser
    }
 }



