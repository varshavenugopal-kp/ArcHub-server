import { CategoryRepository } from "../../../Infra/repositories/CategoryRepository";
export const categoryList=(categoryRepository:CategoryRepository)=>async()=>{
    const category=await categoryRepository.showCategory()
    return category?category:null
}