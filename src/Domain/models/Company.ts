import mongoose from "mongoose"

export interface Company{
    
    cname?:string,
    location?:string,
    district?:string,
    state?:string,
    email?:string,
    password?:string
    file?:string
    status?:boolean
    regStatus?:boolean
    details?:object
    description?:string
    projects?:Array<object>
}