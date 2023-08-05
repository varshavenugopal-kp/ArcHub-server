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
    file:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false,
        required:true
    },
    regStatus:{
        type:Boolean,
        default:false,
        required:true
    },
    details:{
        type:Object
    },
    description:{
        type:String,
    },
    projects:{
        type:Array,
        required:true
    },
    services:{
        type:Array,
    
    },
    image:{
        type:String,
        
    },
    logo:{
        type:String
    }
    


})
export const companyModel:MongodbCompany=mongoose.connection.model<Document<any,any,any>&Company>('company',companySchema)
