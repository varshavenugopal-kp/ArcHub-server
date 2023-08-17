"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = (req, res, next) => {
    try {
        console.log("mmmmm");
        let userToken = req.headers.userToken;
        let JWT = process.env.JWT_SECRET;
        console.log("usertoken?", userToken);
        console.log("hooo", req.headers);
        if (userToken) {
            userToken = userToken.toString();
            let decoded = jsonwebtoken_1.default.verify(userToken, JWT);
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
exports.userAuth = userAuth;
