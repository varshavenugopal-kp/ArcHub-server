"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = (req, res, next) => {
    try {
        let token = req.headers.token;
        let JWT_SECRET = "sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456";
        console.log("token????????", token);
        if (token) {
            token = token.toString();
            let decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const isTokenExpired = decoded.exp < currentTimestamp;
            if (isTokenExpired) {
                res.json({ message: 'expired' });
            }
            else {
                next();
            }
        }
        else {
            res.json({ message: 'unauthorized' });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.adminAuth = adminAuth;
