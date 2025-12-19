
import pool from "../config/database.js";

export const saveLoginActivity = async (userId, email) => {
    await pool.execute(
       `INSERT INTO activity_logs (user_id, email, activity, timestamp)
         VALUES (?, ?, ?, NOW())`,
        [userId, email, "User logged in"]
    );
  
};

export const showLoginActivity = async () => {
    const [rows] = await pool.execute(
        `SELECT * FROM useractivity_logs ORDER BY timestamp DESC`
    );
    return rows;
};

//corrected
export const saveActivity = async (
    adminName,
    actionType,
    targetEntity,
    targetName,
    oldValue,
    newValue,
    details,
    status = "Success"
) => {
    await pool.execute(`
        INSERT INTO useractivity_logs
        (admin_name, action_type, target_entity, target_name,
         old_value, new_value, action_details, status)                   
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
        adminName,
        actionType,
        targetEntity,
        targetName,
        oldValue ? JSON.stringify(oldValue) : null,
        newValue ? JSON.stringify(newValue) : null,
        details,
        status
    ]);
     
};


