import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface CAuth {

    iat: number;
    exp: number
}


export const companyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
       
        
        let cmpToken = req.headers.cmptoken
        let JWT_SECRET = process.env.JWT_SECRET as string
        console.log("Helloooooo");
        
        // console.log("token??",cmpToken);
        // console.log("ghgh",req.headers);
        
    
        
        
        if (cmpToken) {
            console.log("token",req.headers);
            cmpToken = cmpToken.toString()
            let decoded = jwt.verify(cmpToken, JWT_SECRET) as CAuth
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const isTokenExpired = decoded.exp < currentTimestamp;
            if (isTokenExpired) {
                res.json({ message: 'expired' })
                console.log("expired");
                
            } else {
                next()
                console.log("next");
                
            }
        } else {
            res.json({ message: 'unauthorized' })
            console.log("unauthorized");
            

        }
    }
    catch (err) {
        console.log(err);

    }
}