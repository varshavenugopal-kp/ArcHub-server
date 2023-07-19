import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface CAuth {

    iat: number;
    exp: number
}


export const companyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
       
        
        let cmpToken = req.headers.cmpToken
        let JWT_SECRET = process.env.JWT_SECRET as string
        
        
        if (cmpToken) {
            console.log("token",req.headers);
            cmpToken = cmpToken.toString()
            let decoded = jwt.verify(cmpToken, JWT_SECRET) as CAuth
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