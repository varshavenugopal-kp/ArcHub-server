import mongoose, { ObjectId } from "mongoose"


export interface Jobs{
    cId?:mongoose.Types.ObjectId
    title?:string
    salary?:number
    qualification?:string
    experience?:string
    deadline?:Date
    type?:string
    description?:string
}