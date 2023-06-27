import mongoose,{Document,Model,Schema} from "mongoose";
import {User} from '../../Domain/models/User'
export type MongoDbUser = Model<Document<any,any,any>&User>
// Define the schema for the user collection


const userSchema = new Schema<User>({
   fname:{
    type:String,
    required:true
   },
   lname:{
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
  });

  export const userModel: MongoDbUser = mongoose.connection.model<Document<any, any, any> & User>('user', userSchema);
