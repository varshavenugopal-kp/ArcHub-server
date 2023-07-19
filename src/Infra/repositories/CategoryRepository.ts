import { MongodbCategory,categoryModel } from "../database/Category";
import { ObjectId } from "mongoose";
import {Category} from '../../Domain/models/Category'
export type CategoryRepository={
    create:(categories:Category)=>Promise<Category|null>
    showCategory:()=>Promise<Category[]>
}

export const CategoryRepositoryImpl=(categoryModel:MongodbCategory):CategoryRepository=>{
    const create=async(category:Category):Promise<Category>=>{
        const createCategory=await categoryModel.create(category);
        return createCategory.toObject()
    }
    const showCategory=async():Promise<Category[]>=>{
        const categoryList=await categoryModel.find()
        console.log("categoryList",categoryList);
        return categoryList.map((category)=>category.toObject())
        
    }

    return{
        create,
        showCategory
    }
}