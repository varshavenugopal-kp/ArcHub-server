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
exports.showCompanies = exports.cmpCount = exports.showCompany = void 0;
const showCompany = (companyRepository) => (page) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield companyRepository.showCompany(page);
    return company ? company : null;
});
exports.showCompany = showCompany;
const cmpCount = (companyRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield companyRepository.cmpCount();
    return company ? company : null;
});
exports.cmpCount = cmpCount;
const showCompanies = (companyRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield companyRepository.showCompanies();
    return company ? company : null;
});
exports.showCompanies = showCompanies;
