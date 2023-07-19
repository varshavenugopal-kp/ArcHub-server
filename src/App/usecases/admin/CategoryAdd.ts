import mongoose,{ObjectId} from "mongoose";
import { CategoryRepository } from "../../../Infra/repositories/CategoryRepository";
import { Category } from "../../../Domain/models/Category";


export const categoryAdd=(CategoryRepository:CategoryRepository)=>async(category:string,file:string):Promise<Category|null>=>{
     const newCategory:Category={
        category,
        file
     }
   
   
    const categories=await CategoryRepository.create(newCategory)
    console.log("categoryData",categories);
    return categories
}