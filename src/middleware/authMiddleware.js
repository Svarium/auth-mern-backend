import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";


export const protect = asyncHandler(async(req,res, next) => {
    try {
        //check if user is login
        const token = req.cookies.token;

        if(!token){
            //401 unauthorized
         return  res.status(401).json({message:"not authorized , please login!"});
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //get user details from the token -----> exclude pass
        const user = await User.findById(decoded.id).select("-password");

        //check if user exist
        if(!user){
          return res.status(404).json({message:"user not found"});
        }

        //set user details in the request objet
        req.user = user;

        next();
    
    } catch (error) {
        //401 unauthorized
        res.status(401).json({message:"Not authorized, token failed"});
    }
});