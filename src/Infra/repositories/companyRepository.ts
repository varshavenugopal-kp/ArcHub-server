import { Company } from "../../Domain/models/Company";
import { MongodbCompany, companyModel } from "../database/companyModel";
import { MongoDbUser, userModel } from '../database/userModel';
import { ObjectId } from 'mongodb';
interface updateResult{
    acknowledged:boolean
    modifiedCount:number
    upsertedId:ObjectId|null
    upsertedCount:number
    matchedCount:number
  }

export type companyRepository={
    create:(company:Company)=>Promise<Company|null>;
    loginCompany:(email:string)=>Promise<Company|null>
    showCompany:()=>Promise<Company[]>
    blockCompany(id:string):Promise<Company|void|updateResult>
    unblockCompany(id:string):Promise<Company|void|updateResult>
}

 export const companyRepositoryImpl=(companyModel:MongodbCompany):companyRepository=>{
    const create = async(company:Company):Promise<Company>=>{
        const createdCompany=await companyModel.create(company);
        return createdCompany.toObject();
    };

    const loginCompany=async(email:string):Promise<Company|null>=>{
        const companyCheck=await companyModel.findOne({email});
        return companyCheck?companyCheck.toObject():null;

    };

    const showCompany=async():Promise<Company[]>=>{
        const companyData=await companyModel.find()
        console.log("companyData",companyData);
        return companyData.map((company)=>company.toObject())
        
    }

    const blockCompany=async(id:string):Promise<Company|void|updateResult>=>{
        const result=await companyModel.updateOne({_id:new ObjectId(id)},{$set:{status:false}})
        return result
    }
    const unblockCompany=async(id:string):Promise<Company|void|updateResult>=>{
        const result=await companyModel.updateOne({_id:new ObjectId(id)},{$set:{status:true}})
        return result
    }
    return{
        create,
        loginCompany,
        showCompany,
        blockCompany,
        unblockCompany
    }
 }