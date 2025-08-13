import pool from "../config/database.js"
export const getUserProfiles=async()=>{
try{

  const sql=`select * from User_Profiles`;
    const [result]=await pool.execute(sql)
    return result;
}
catch(error){
    throw error;
}


}
