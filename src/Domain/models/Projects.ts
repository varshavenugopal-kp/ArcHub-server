import mongoose from "mongoose"

export interface Projects{
    cid?:mongoose.Types.ObjectId
    pname?:string
    description?:string
    url?:string[]
}