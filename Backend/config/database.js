
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();



const config={
    // host:process.env.DB_HOST,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    // port:process.env.DB_PORT

}



const pool = mysql.createPool(config);




(async () => {

try{
    const connection = await pool.getConnection();
    console.log(`Connected to the database successfully!`);
    connection.release(); 
}
catch(error){
    console.error("Error connecting to the database:", error);
}
  

})();

export default pool;