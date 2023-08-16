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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const UserRepositoryImpl = (userModel) => {
    const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield userModel.create(user);
        return createdUser.toObject();
    });
    const LoginUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("klklklk", email);
        const userCheck = yield userModel.findOne({ email });
        console.log("oooooooo", userCheck);
        return userCheck ? userCheck.toObject() : null;
    });
    const showUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield userModel.find();
        console.log("userData", userData);
        return userData.map((user) => user.toObject());
    });
    const blockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: false } });
        return result;
    });
    const UnblockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: true } });
        return result;
    });
    const addProImage = (id, img) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("pranav", id);
        const result = yield userModel.updateOne({ _id: id }, { $set: { image: img } });
        console.log("added", result);
        return result;
    });
    const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield userModel.findOne({ _id: id });
        const _a = userData === null || userData === void 0 ? void 0 : userData.toObject(), { password, _id, status } = _a, data = __rest(_a, ["password", "_id", "status"]);
        return data;
    });
    const resetPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel.updateOne({ email: email }, { $set: { password: password } });
        if (result.modifiedCount > 0) {
            console.log('Password reset successful');
            return result;
        }
        return result;
    });
    const update = (fname, lname, email, image, uId) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = new mongoose_1.default.Types.ObjectId(uId);
        console.log(fname);
        console.log(lname);
        console.log(email);
        console.log(image);
        console.log(uId);
        const result = yield userModel.updateOne({ _id: userId }, { $set: { fname: fname, lname: lname, email: email, } });
        console.log("failll", result);
        if (result.modifiedCount > 0) {
            console.log('successful');
            return result;
        }
        return result;
    });
    return {
        create,
        LoginUser,
        showUser,
        blockUser,
        UnblockUser,
        addProImage,
        getSingleUser,
        resetPassword,
        update
    };
};
exports.UserRepositoryImpl = UserRepositoryImpl;
