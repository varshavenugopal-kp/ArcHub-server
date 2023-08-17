"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const companyAuth = (req, res, next) => {
    try {
        let cmpToken = req.headers.cmptoken;
        let JWT_SECRET = process.env.JWT_SECRET;
        console.log("Helloooooo");
        // console.log("token??",cmpToken);
        // console.log("ghgh",req.headers);
        if (cmpToken) {
            console.log("token", req.headers);
            cmpToken = cmpToken.toString();
            let decoded = jsonwebtoken_1.default.verify(cmpToken, JWT_SECRET);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const isTokenExpired = decoded.exp < currentTimestamp;
            if (isTokenExpired) {
                res.json({ message: 'expired' });
                console.log("expired");
            }
            else {
                next();
                console.log("next");
            }
        }
        else {
            res.json({ message: 'unauthorized' });
            console.log("unauthorized");
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.companyAuth = companyAuth;
