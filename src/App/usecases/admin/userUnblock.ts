import { ObjectId } from "bson";
import { User } from "../../../Domain/models/User";
import { UserRepository } from "../../../Infra/repositories/userRepository";
import {Update} from "../../../Domain/models/Update"

export const Unblockuser=(userRepository:UserRepository)=>async(id:string):Promise<User|Update|void>=>{
const UnblockUser = await userRepository.UnblockUser(id)
}
