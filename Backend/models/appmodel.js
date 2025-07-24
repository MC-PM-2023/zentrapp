import express from 'express';
import pool from '../config/database.js';


export const addappmodelcard=async(appname,appdescription,applink,assignedteam)=>{
    const [result]=await pool.execute(
        `insert into projects (appname,appdescription,applink,assignedteam) values(?,?,?,?)`,[appname,appdescription,applink,assignedteam]
    )
    return result;
}


export const getcreatedappsbyteam=async(assignedteam)=>{

    const[result]=await pool.execute(
        `select * from projects where assignedteam= ? order by created_at desc`,[assignedteam]
    )
    return result;
}