import { CategoryRepository } from "../../../Infra/repositories/CategoryRepository";
export const getCategories=(categoryRepository:CategoryRepository)=>async()=>{
    const category=await categoryRepository.showCategory()
    return category?category:null
}