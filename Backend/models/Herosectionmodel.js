import pool from "../config/database.js"
export const getHeroSections=async()=>{
try{

  const sql=`select * from ds_logo_frame`;
    const [result]=await pool.execute(sql)
    return result;
}
catch(error){
    throw error;
}


}
