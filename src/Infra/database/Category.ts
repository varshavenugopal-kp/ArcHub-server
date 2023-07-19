import mongoose,{Document,Model,Schema} from "mongoose"
import { Category } from "../../Domain/models/Category"

export type MongodbCategory=Model<Document<any,any,any>&Category>

const categorySchema=new Schema<Category>({
   category:{
      type:String,
      required:true
   },
   file:{
      type:String,
      required:true
   }
})
export const categoryModel:MongodbCategory=mongoose.connection.model<Document<any,any,any>&Category>('category',categorySchema)