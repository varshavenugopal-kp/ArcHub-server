import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface Auth {

    iat: number;
    exp: number
}


export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.token
        let JWT_SECRET = "sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"
        console.log("token????????",token);

        if (token) {
            token = token.toString()
            let decoded = jwt.verify(token, JWT_SECRET) as Auth
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const isTokenExpired = decoded.exp < currentTimestamp;
            if (isTokenExpired) {
                res.json({ message: 'expired' })
            } else {
                next()
            }
        } else {
            res.json({ message: 'unauthorized' })
        }
    }
    catch (err) {
        console.log(err);

    }
}