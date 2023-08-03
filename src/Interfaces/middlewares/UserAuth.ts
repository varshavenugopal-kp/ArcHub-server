import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface Auth {

    iat: number;
    exp: number
}


export const userAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("mmmmm");
        
        let userToken = req.headers.userToken
        let JWT = process.env.JWT_SECRET as string
        console.log("usertoken?",userToken);
        console.log("hooo",req.headers);
        
        

        if (userToken) {
            userToken = userToken.toString()
            let decoded = jwt.verify(userToken, JWT) as Auth
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