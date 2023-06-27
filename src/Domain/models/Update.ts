import { ObjectId } from "bson";

export interface Update{
    acknowledged:boolean
    modifiedCount:number
    upsertedId:ObjectId|null
    upsertedCount:number
    matchedCount:number
}