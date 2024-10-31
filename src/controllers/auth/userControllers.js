import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";
import generateToken from "../../helpers/generateToken.js";
import bcrypt from "bcrypt";

// user register
export const registerUser = asyncHandler(async (req, res) => {
   const {name, email, password} = req.body;

   //validations
   if(!name || !email || !password){
    //400 bad request
    res.status(400).json({message: "All fields are required"})
   }

   //check password length
   if(password.length < 6){
    return res
    .status(400)
    .json({message: "Password must be at least 6 characters"})
   }

   //check if user already exist
   const userExist = await User.findOne({email});
   //400 bad request
   if(userExist){
    return res.status(400).json({message:"user already exists"})
   }
   
   //create new user
   const user = await User.create({
    name,
    email,
    password
    });

   //generate token with the user id
   const token = generateToken(user._id);

 //send back the user data and token in the response to the client
 res.cookie("token", token, {
    path:"/",
    httpOnly:true,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30dias
    sameSite:true,
    secure: true
 })
   

  if(user) {
    const {_id, name, email, role, photo, bio, isVerified} = user;
    //201 created
    res.status(201).json({
        _id,
        name,
        email,
        role, 
        photo, 
        bio,
        isVerified,
        token
    });
  } else {
    res.status(400).json({message:"invalid user data"})
  }
});


//user login

export const loginUser = asyncHandler(async (req,res) => {
    //get email and password from req.body
    const {email, password} = req.body;

    //validations
    if(!email || !password){
        //400 bad request
        return res.status(400).json({message:"all fields are required"});
    }

    //check if user existe

    const userExist = await User.findOne({email});
    if(!userExist){
        return res.status(404).json({message:"user not found, sign up!"});
    }

    //check if the password match te hased password in the database
    const isMatch = await bcrypt.compare(password, userExist.password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }

    //generate token whit user id

    const token = generateToken(userExist._id);

    if(userExist && isMatch){
        const {_id, name, email, role, photo, bio, isVerified} = userExist;
        
    //set the token in a cookie
       res.cookie("token", token, {
        path:"/",
        httpOnly:true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite:true,
        secure:true
       });

       //send back the user and token in te response to the client
       res.status(200).json({
        _id,
        name,
        email,
        role, 
        photo, 
        bio,
        isVerified,
        token
       })
    } else {
        res.status(400).json({message:"Invalid user data"})
    }
});



