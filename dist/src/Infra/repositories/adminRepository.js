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
exports.adminRepositoryImpl = void 0;
const adminModel_1 = require("../database/adminModel");
const adminRepositoryImpl = (userModel) => {
    const LoginAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const adminCheck = yield adminModel_1.adminModel.findOne({ email });
        console.log("aaaaaaa", adminCheck);
        return adminCheck ? adminCheck.toObject() : null;
    });
    return {
        LoginAdmin
    };
};
exports.adminRepositoryImpl = adminRepositoryImpl;
