// import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
// import { Company } from "../../../Domain/models/Company";
// import { companyRepository,companyRepositoryImpl } from "../../../Infra/repositories/companyRepository";

// export const viewAbout=(companyRepository:companyRepository)=>async(cId:mongoos.Types.ObjectId)=>{
//     const about = await companyRepository.viewAbout(cId)
//     console.log("details",about);
//     return about?about:null
// }