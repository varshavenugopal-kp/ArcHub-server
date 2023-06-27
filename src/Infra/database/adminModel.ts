import mongoose,{AnyArray, Document,Model,Schema} from "mongoose"
import { Admin } from "../../Domain/models/Admin"
export type mongodbAdmin=Model<Document<any,any,any>&Admin>

const AdminSchema=new Schema<Admin>({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
export const adminModel:mongodbAdmin=mongoose.connection.model<Document<any,any,any>&Admin>('admin',AdminSchema)