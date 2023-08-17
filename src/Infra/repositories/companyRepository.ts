import mongoos from "mongoose";
import { UpdateWriteOpResult } from "mongoose";
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
    
    showCompany:(page:number)=>Promise<Company[]>
    showCompanies:()=>Promise<Company[]>
    cmpCount:()=>Promise<number[]>
    blockCompany(id:string):Promise<Company|void|updateResult>
    unblockCompany(id:string):Promise<Company|void|updateResult>
    showRequests:()=>Promise<Company[]>
    requestAccept(id:string):Promise<Company|void|updateResult>
    detailsAdd:(details:object,id:mongoos.Types.ObjectId)=>Promise<UpdateWriteOpResult>;
    projectAdd:(projects:Array<object>,id:mongoos.Types.ObjectId)=>Promise<UpdateWriteOpResult>
    aboutAdd:(cId:mongoos.Types.ObjectId,description:string)=>Promise<UpdateWriteOpResult>
    viewDetails:(cId:mongoos.Types.ObjectId)=>Promise<Company|null>
    // getInfo:(cId:mongoos.Types.ObjectId)=>Promise<Company|null>
    addImage:(cid:mongoos.Types.ObjectId,image:string)=>Promise<UpdateWriteOpResult>
    addlogo:(cid:mongoos.Types.ObjectId,image:string)=>Promise<UpdateWriteOpResult>
    editAbout:(cid:mongoos.Types.ObjectId,data:string)=>Promise<UpdateWriteOpResult>
    // viewAbout:(cId:mongoos.Types.ObjectId)=>Promise<Company|null>
    detailsEdit:(details:object,id:mongoos.Types.ObjectId)=>Promise<UpdateWriteOpResult>;
    updateCategory:(cId:mongoos.Types.ObjectId,category:string,details:string)=>Promise<UpdateWriteOpResult>;
    deleteCategory:(cId:mongoos.Types.ObjectId,category:string,details:string)=>Promise<UpdateWriteOpResult>;
    getCompany:(cid:mongoos.Types.ObjectId)=>Promise<Company|null>
    addServices:(services:Array<object>,cid:mongoos.Types.ObjectId)=>Promise<UpdateWriteOpResult>
    getCompanyList:(category:string)=>Promise<Company[]>
    getProjects:(pname:string)=>Promise<Company[]|null>
    request:(userId:mongoos.Types.ObjectId,cmpId:mongoos.Types.ObjectId)=>Promise<UpdateWriteOpResult|null>
    getRequests:(cId:mongoos.Types.ObjectId)=>Promise<Company[]|null>
}

 export const companyRepositoryImpl=(companyModel:MongodbCompany):companyRepository=>{
    const create = async(company:Company):Promise<Company|any>=>{
        try{

            const createdCompany=await companyModel.create(company);
            console.log("created",createdCompany);
            return createdCompany.toObject();
        }catch(error){
            console.log(error)
        }
    };

    const loginCompany=async(email:string):Promise<Company|null>=>{
        const companyCheck=await companyModel.findOne({email});
        return companyCheck?companyCheck.toObject():null;

    };
    const cmpCount=async():Promise<number[]>=>{
        let Count=await companyModel.countDocuments({status:true})
        const limit=6
        let skip=0
        const page=Count/limit
        console.log(page,"counts");
        
        let cmpCount=Math.ceil(page)
        console.log(cmpCount,"__________________________________________________");
        let pagecount:number[] = []
        for(let i=1;i<=cmpCount;i++){ 
            pagecount.push(i)
        }
        console.log("pageCount",pagecount);
        
        return pagecount
    }

    const showCompany=async(page:number):Promise<Company[]>=>{
        const limit=4
        let skip=0
       
        skip=(page-1)*limit;
        const companyData=await companyModel.find({regStatus:true}).limit(limit).skip(skip)
        console.log("companyData",companyData);
        return companyData.map((company)=>company.toObject())
        
    }
    const showCompanies=async():Promise<Company[]>=>{
      
        const companyData=await companyModel.find({regStatus:true})
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
    const showRequests=async():Promise<Company[]>=>{
        const requests=await companyModel.find({regStatus:false});
        console.log("requests",requests);
        
        return requests.map((company)=>company.toObject())
      };
      const requestAccept=async(id:string):Promise<Company|void|updateResult>=>{
        const result=await companyModel.updateOne({_id:new ObjectId(id)},{$set:{regStatus:true,status:true}})
        console.log("nnnn",result);
        
        return result
    };
    const detailsAdd=async(details:object,id:mongoos.Types.ObjectId):Promise<UpdateWriteOpResult>=>{
        console.log("ssss",details);
        
        const createdDetails=await companyModel.updateOne({ _id:id}, { $set: {details: details } })
        return createdDetails
    }

    const projectAdd=async(projects:Array<object>,id:mongoos.Types.ObjectId):Promise<UpdateWriteOpResult>=>{
        const createdProjects=await companyModel.updateOne({_id:id},{ $push: { projects:projects}})
        console.log(".......",projects);
        
        return createdProjects
    }

    const aboutAdd=async(cId:mongoos.Types.ObjectId,description:string):Promise<UpdateWriteOpResult>=>{
        console.log("ssss",description);
        
        const createdAbout=await companyModel.updateOne({ _id:cId}, { $set: {description:description } })
        return createdAbout
    }

    const viewDetails=async(cId:mongoos.Types.ObjectId):Promise<Company|null>=>{
        const details=await companyModel.findOne({_id:cId})
        console.log("checkingggg",details);
        
        return details
        
    }
    // const viewAbout=async(cId:mongoos.Types.ObjectId):Promise<Company|null>=>{
    //     const details=await companyModel.findOne({_id:cId})
    //     return details
        
    // }
    const addImage=async(cid:mongoos.Types.ObjectId,image:string):Promise<UpdateWriteOpResult>=>{
        console.log("ssss",image);
        console.log("ooo",cid);
        
        
        const createdImage=await companyModel.updateOne({ _id:cid}, { $set: {image:image } })
        console.log(createdImage);
        return createdImage
        
        
    }
    const addlogo=async(cid:mongoos.Types.ObjectId,image:string):Promise<UpdateWriteOpResult>=>{
        console.log("ssss",image);
        console.log("ooo",cid);
        
        
        const createdImage=await companyModel.updateOne({ _id:cid}, { $set: {logo:image } })
        console.log(createdImage);
        return createdImage
        
        
    }

    const editAbout=async(cid:mongoos.Types.ObjectId,data:string):Promise<UpdateWriteOpResult>=>{
        console.log("ssss",data);
        
        const aboutEdit=await companyModel.updateOne({ _id:cid}, { $set: {description:data } })
        return aboutEdit
    }
    const detailsEdit=async(details:object,id:mongoos.Types.ObjectId):Promise<UpdateWriteOpResult>=>{
        
        console.log("ssss",details);
        
        const createdDetails=await companyModel.updateOne({ _id:id}, { $set: {details: details } })
        return createdDetails
    }

    const getCompany=async(cid:mongoos.Types.ObjectId):
    Promise<Company|null>=>{
        const company=await companyModel.findOne({_id:cid})
        console.log("varsha",company);
        return company
    }
    const addServices=async(services:Array<object>,cid:mongoos.Types.ObjectId):Promise<UpdateWriteOpResult>=>{
        console.log("ssss",services);
        
        const createdServices=await companyModel.updateOne({ _id:cid}, { $push: {services: services } })
        console.log("....",services);
        
        return createdServices
    }
    const deleteCategory=async(cId:mongoos.Types.ObjectId,category:string,details:string):Promise<UpdateWriteOpResult>=>{
        console.log("ssss",category);
        
        const deletedServices=await companyModel.updateOne({ _id:cId}, { $pull: {services:{category:category} } })
        console.log("....");
        console.log(deletedServices);
        
        
        return deletedServices
    }
    const getCompanyList=async(category:string):Promise<Company[]>=>{
        console.log("catId",category);
        
        const companies=await companyModel.find({
            services: {
              $elemMatch: {
                category: category
              }
            }
          })
        console.log("noo",companies);
        
        return companies
    }
    const getProjects=async(pname:string):Promise<Company[]|null>=>{
        const getproject=await companyModel.aggregate([{$unwind:"$projects"},{$match:{"projects.pname":pname}}])
        console.log("varsha",getproject);
        
        return getproject
      }
      const request=async(userId:mongoos.Types.ObjectId,cmpId:mongoos.Types.ObjectId):Promise<UpdateWriteOpResult>=>{
        const requests=await companyModel.updateOne({_id:cmpId},{$push:{requests:userId}})
        console.log("good spirit pls come",requests);
        
        return requests
    }
    const getRequests=async(cId:mongoos.Types.ObjectId):Promise<Company[]|null>=>{
        const getRequests=await companyModel.find({_id:cId},{requests:1})
        return getRequests ? getRequests : null;
    }
    const updateCategory=async(cId:mongoos.Types.ObjectId,category:string,details:string):Promise<UpdateWriteOpResult>=>{
        console.log(cId);
        console.log(category);
        console.log(details);
        
        const getUpdatedData=await companyModel.updateOne({_id:cId,"services.category":category},{$set:{"services.$.details":details}})
        console.log(getUpdatedData);
        
        return getUpdatedData
    }
    return{
        create,
        loginCompany,
        showCompany,
        showCompanies,
        blockCompany,
        cmpCount,
        unblockCompany,
        showRequests,
        requestAccept,
       detailsAdd,
       projectAdd,
       aboutAdd,
       viewDetails,
       addImage,
       addlogo,
       editAbout,
       detailsEdit,
       getCompany,
       addServices,
       getCompanyList,
       getProjects,
       request,
       getRequests,
       updateCategory,
       deleteCategory
    }
 }