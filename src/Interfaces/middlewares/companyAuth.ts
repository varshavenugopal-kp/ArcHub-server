import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface CAuth {

    iat: number;
    exp: number
}


export const companyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
       
        
        let token = req.headers.token
        let JWT_SECRET = "sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"
        
        
        if (token) {
            console.log("token",req.headers);
            token = token.toString()
            let decoded = jwt.verify(token, JWT_SECRET) as CAuth
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