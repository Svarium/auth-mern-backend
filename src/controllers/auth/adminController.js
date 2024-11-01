import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";

export const deleteUser = asyncHandler(async(req,res) => {
  const {id} = req.params;

  try {
  //attempt to find and delete the user
  const user = await User.findByIdAndDelete(id);

  //check if user exist
  if(!user){
   return res.status(404).json({message:"user not found"})
  }  

  //confirm delete user
  return res.status(200).json({message:"user deleted succesfully!"})  
  } catch (error) {
    return res.status(500).json({message:"Cannot Delete user"})
  }
})