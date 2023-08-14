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
exports.dashboardController = exports.categoryController = exports.categoryAddController = exports.requestAcceptController = exports.companyRequestsController = exports.companyUnblockController = exports.companyBlockController = exports.userUnblockController = exports.userBlockController = exports.showCompanyController = exports.showUserController = exports.adminLoginController = void 0;
const adminModel_1 = require("../../Infra/database/adminModel");
const adminRepository_1 = require("../../Infra/repositories/adminRepository");
const Alogin_1 = require("../../App/usecases/admin/Alogin");
const userRepository_1 = require("../../Infra/repositories/userRepository");
const userModel_1 = require("../../Infra/database/userModel");
const userManage_1 = require("../../App/usecases/admin/userManage");
const companyModel_1 = require("../../Infra/database/companyModel");
const companyRepository_1 = require("../../Infra/repositories/companyRepository");
const companyManage_1 = require("../../App/usecases/admin/companyManage");
const userBlock_1 = require("../../App/usecases/admin/userBlock");
const userUnblock_1 = require("../../App/usecases/admin/userUnblock");
const companyBlock_1 = require("../../App/usecases/admin/companyBlock");
const companyUnblock_1 = require("../../App/usecases/admin/companyUnblock");
const Requests_1 = require("../../App/usecases/admin/Requests");
const requestAccept_1 = require("../../App/usecases/admin/requestAccept");
const CategoryAdd_1 = require("../../App/usecases/admin/CategoryAdd");
const Category_1 = require("../../Infra/database/Category");
const CategoryRepository_1 = require("../../Infra/repositories/CategoryRepository");
const CategoryList_1 = require("../../App/usecases/admin/CategoryList");
const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = "sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456";
const db = adminModel_1.adminModel;
const userdb = userModel_1.userModel;
const companydb = companyModel_1.companyModel;
const CategoryDb = Category_1.categoryModel;
const adminRepository = (0, adminRepository_1.adminRepositoryImpl)(db);
const userRepository = (0, userRepository_1.UserRepositoryImpl)(userdb);
const companyRepository = (0, companyRepository_1.companyRepositoryImpl)(companydb);
const categoryRepository = (0, CategoryRepository_1.CategoryRepositoryImpl)(CategoryDb);
const adminLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("heeey");
    try {
        const admin = yield (0, Alogin_1.LoginAdmin)(adminRepository)(email, password);
        if (admin) {
            const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
            const payload = {
                exp: expirationTime,
            };
            const token = jsonwebtoken.sign(payload, JWT_SECRET);
            res.json({ message: "login success", admin, token });
        }
        else {
            res.json({ invalid: "invalid credentials" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.adminLoginController = adminLoginController;
const showUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield (0, userManage_1.showUser)(userRepository)();
        console.log("haai varsha", userData);
        if (userData) {
            res.json({ message: 'Data found', userData });
        }
    }
    catch (error) {
        res.json({ message: 'Internal server error' });
    }
});
exports.showUserController = showUserController;
// export const blockUserController=
const showCompanyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyData = yield (0, companyManage_1.showCompanies)(companyRepository)();
        console.log("haai varsha", companyData);
        if (companyData) {
            res.json({ message: 'Data found', companyData });
        }
    }
    catch (error) {
        res.json({ message: 'Internal server error' });
    }
});
exports.showCompanyController = showCompanyController;
const userBlockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const blocked = yield (0, userBlock_1.blockuser)(userRepository)(id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.userBlockController = userBlockController;
const userUnblockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const blocked = yield (0, userUnblock_1.Unblockuser)(userRepository)(id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.userUnblockController = userUnblockController;
const companyBlockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const blocked = yield (0, companyBlock_1.blockCompany)(companyRepository)(id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.companyBlockController = companyBlockController;
const companyUnblockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const blocked = yield (0, companyUnblock_1.unblockCompany)(companyRepository)(id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.companyUnblockController = companyUnblockController;
const companyRequestsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyData = yield (0, Requests_1.showRequests)(companyRepository)();
        console.log("haai varsha", companyData);
        if (companyData) {
            res.json({ message: 'Data found', companyData });
        }
    }
    catch (error) {
        res.json({ message: 'Internal server error' });
    }
});
exports.companyRequestsController = companyRequestsController;
const requestAcceptController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const blocked = yield (0, requestAccept_1.acceptCompany)(companyRepository)(id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.requestAcceptController = requestAcceptController;
const categoryAddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ccccc", req.body);
    const { category, file } = req.body;
    console.log("category", category);
    try {
        const addedData = yield (0, CategoryAdd_1.categoryAdd)(categoryRepository)(category, file);
        if (addedData) {
            res.status(201).json({ message: "successful", addedData });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.categoryAddController = categoryAddController;
const categoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, CategoryList_1.categoryList)(categoryRepository)();
        if (categories) {
            res.json({ message: 'Data found', categories });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.categoryController = categoryController;
const dashboardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userManage_1.showUser)(userRepository)();
        const userCount = users === null || users === void 0 ? void 0 : users.length;
        console.log("userCount", userCount);
        const companies = yield (0, companyManage_1.showCompanies)(companyRepository)();
        const companyCount = companies === null || companies === void 0 ? void 0 : companies.length;
        console.log("company", companyCount);
        const categories = yield (0, CategoryList_1.categoryList)(categoryRepository)();
        const categoryCount = categories === null || categories === void 0 ? void 0 : categories.length;
        console.log("categoryCount", categoryCount);
        const blocked = companies === null || companies === void 0 ? void 0 : companies.filter((obj) => obj.status === false);
        const blockedCount = blocked === null || blocked === void 0 ? void 0 : blocked.length;
        console.log("blockedCount", blockedCount);
        res.json({ message: "successfull", userCount, companyCount, categoryCount, blockedCount });
    }
    catch (error) {
    }
});
exports.dashboardController = dashboardController;
