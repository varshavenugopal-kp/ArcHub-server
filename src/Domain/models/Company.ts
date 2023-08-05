import mongoose from "mongoose"

export interface Company{
    _id?:string,
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
    image?:string
    services?:Array<object>
    logo?:string
}