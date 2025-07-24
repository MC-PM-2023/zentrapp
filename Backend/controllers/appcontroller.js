import { addappmodelcard, getcreatedappsbyteam } from "../models/appmodel.js"

export const createapp=async(req,res)=>{


    const {appname,appdescription,applink,assignedteam}=req.body;
if( !appname || !appdescription || !applink || !assignedteam){
    return res.status(400).json({message:"All fields are required !"})
}

try{
    
    await addappmodelcard(appname,appdescription,applink,assignedteam)
    return res.status(200).json({message:"App added Successfully !"})

}
catch(error){
    console.log("Error in adding projects:",error)
    return res.status(500).json({message:"Error in adding createapp controller"})

}
}

export const getappsbyteam=async(req,res)=>{


    const {team}=req.params;
    if (!team) {
        return res.status(400).json({ message: "Team parameter is missing" });
    }
try{
    const result=await getcreatedappsbyteam(team);
    return res.status(200).json(result)
    
}
catch(error){
    console.log("Error in getappsbyteam controller:",error)
    return res.status(500).json({message:"Error in getappsbyteam controller:",error:error.message})

}

}



