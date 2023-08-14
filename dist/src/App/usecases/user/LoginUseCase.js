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
exports.passwordReset = exports.CheckUser = exports.LoginUser = void 0;
const LoginUser = (UserRepository) => (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email, "lll");
    const createdUser = yield UserRepository.LoginUser(email);
    if (createdUser && createdUser.password === password) {
        console.log("mmm", createdUser);
        return createdUser;
    }
    return null;
});
exports.LoginUser = LoginUser;
const CheckUser = (UserRepository) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield UserRepository.LoginUser(email);
    return createdUser ? createdUser : null;
});
exports.CheckUser = CheckUser;
const passwordReset = (UserRepository) => (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const pswd = yield UserRepository.resetPassword(email, password);
    return pswd;
});
exports.passwordReset = passwordReset;
