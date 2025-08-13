import { getUserProfiles } from "../models/userprofilesmodel.js";
export const userProfilesController=async(req,res)=>{
    try{
const response=await getUserProfiles();
return res.status(200).json({success:true,message:"UserProfiles fetched Successfully!",data:response})
    }
    catch(error){
    return res.status(500).json({success:false,error:error.message})
    }
}