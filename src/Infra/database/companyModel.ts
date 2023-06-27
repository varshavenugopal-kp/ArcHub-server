import mongoose,{Document, Model, Schema,} from "mongoose";
import {Company} from '../../Domain/models/Company'
export type MongodbCompany=Model<Document<any,any,any>&Company>

const companySchema= new Schema<Company>({
    cname:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true,
        required:true
       }

})
export const companyModel:MongodbCompany=mongoose.connection.model<Document<any,any,any>&Company>('company',companySchema)
