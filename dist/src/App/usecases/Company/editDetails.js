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
exports.getdeletedCategory = exports.getUpdatedCategory = exports.editDetails = void 0;
const editDetails = (companyRepository) => (cId, details) => __awaiter(void 0, void 0, void 0, function* () {
    const createDetails = yield companyRepository.detailsEdit(details, cId);
    return createDetails;
});
exports.editDetails = editDetails;
const getUpdatedCategory = (companyRepository) => (cId, categories, details) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCategory = yield companyRepository.updateCategory(cId, categories, details);
    return updatedCategory;
});
exports.getUpdatedCategory = getUpdatedCategory;
const getdeletedCategory = (companyRepository) => (cId, categories, details) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCategory = yield companyRepository.deleteCategory(cId, categories, details);
    return updatedCategory;
});
exports.getdeletedCategory = getdeletedCategory;
