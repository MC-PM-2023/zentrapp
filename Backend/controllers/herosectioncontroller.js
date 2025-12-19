import { getHeroSections } from "../models/Herosectionmodel.js";

export const heroSectionController=async(req,res)=>{
    try{
const response=await getHeroSections();
return res.status(200).json({success:true,message:"Hero Section fetched Successfully!",data:response})
    }
    catch(error){
    return res.status(500).json({success:false,error:error.message})
    }
}