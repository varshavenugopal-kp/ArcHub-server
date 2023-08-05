import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { Company } from "../../../Domain/models/Company";
import { companyRepository,companyRepositoryImpl } from "../../../Infra/repositories/companyRepository";

export const viewDetails=(companyRepository:companyRepository)=>async(cId:mongoos.Types.ObjectId)=>{
    const details = await companyRepository.viewDetails(cId)
    console.log("details",details);
    return details?details:null
}

// export const getInfo=(companyRepository:companyRepository)=>async(cId:mongoos.Types.ObjectId)=>{
//     const details = await companyRepository.getInfo(cId)
//     console.log("details",details);
//     return details?details:null
// }