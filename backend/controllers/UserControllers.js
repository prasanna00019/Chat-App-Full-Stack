import User from "../models/UserModel.js";

export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInuserId=req.user._id;
        const allUsers=await User.find({_id:{$ne:loggedInuserId}}).select('-password');;
        res.status(200).json(allUsers);

    } catch (error) {
        console.log("error inusecontrolerr js controller",error.message)
        res.status(500).json({error:"INTERNAL SERVER ERROR"})
    }
}