import { ObjectId } from "bson";
import { User } from "../../../Domain/models/User";
import { UserRepository } from "../../../Infra/repositories/userRepository";

interface updateResult{
    acknowledged:boolean
    modifiedCount:number
    upsertedId:ObjectId|null
    upsertedCount:number
    matchedCount:number
}
export const blockuser=(userRepository:UserRepository)=>async(id:string):Promise<User|updateResult|void>=>{
const blockuser=await userRepository.blockUser(id)
return blockuser
}