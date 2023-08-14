"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepositoryImpl = void 0;
const CategoryRepositoryImpl = (categoryModel) => {
    const create = (category) => __awaiter(void 0, void 0, void 0, function* () {
        const createCategory = yield categoryModel.create(category);
        return createCategory.toObject();
    });
    const showCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        const categoryList = yield categoryModel.find();
        console.log("categoryList", categoryList);
        return categoryList.map((category) => category.toObject());
    });
    return {
        create,
        showCategory
    };
};
exports.CategoryRepositoryImpl = CategoryRepositoryImpl;
