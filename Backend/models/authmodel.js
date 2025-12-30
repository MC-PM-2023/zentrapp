// import express from "express";
// import pool from "../config/database.js";

// export const createuser = async (username, email, password,otp) => {

//     const [result] = await pool.execute(

//         `INSERT into users(username,email,password,otp,status,role) values(?,?,?,?,?,?)`,
//         [username, email, password,otp, "unverified", "User"]
//     )
//     return result;
// }

// export const verifyotp=async(email,otp)=>{

//     const [result]=await pool.execute(
//         `select * from  users where email=? and otp =?`,[email,otp]
        
//     )
//     return result[0]
// }

// export const approveuserafterotp=async(email)=>{

//     const [result]=await pool.execute (
//         `update users set otp=null ,status="pending" where email=?`,[email]
//     )
//     return result;
// }

// export const getUserByEmail = async (email) => {
//     const [result] = await pool.execute(
//         `select * from users where email=?`, [email])
//     return result[0]
// }


// export const getUserProfileByEmail = async (email) => {
//     const [result] = await pool.execute(
//         `SELECT Image_URL FROM User_Profiles WHERE Email_ID = ?`, 
//         [email]
//     );
//     return result[0] ? result[0].Image_URL : null;
// };


// export const approveuser = async (userid, role) => {
//     const [result] = await pool.execute(
//         `update users set status=?, role=? where id=?`, ['Approved', role ,userid])
//     return result;
// }

// export const getuserbyId=async(id)=>{
//     const [result]=await pool.execute(
//         `select username,email from users where id=?`,[id])
//         return result[0];
    
// }
// export const getapproveusers=async()=>{
//     const [result]=await pool.execute(
//         `select id,username ,email, role from users where status="approved"`
//     )
//     return result;

// }

// export const getpendinguser = async () => {
//     const [result] = await pool.execute(
//         `select * from users where status="pending"`
//     )
//     return result;
// }

// export const rejectuser=async(userid)=>{
//     const[result]=await pool.execute(
//         `update users set status =? where id=?`,["Rejected",userid]
//     )
//     return result;
// }


// export const getrejectuser=async()=>{
//     const [result]=await pool.execute(
//         `select username,email,status from users where status ="rejected"`
//     )
//     return result;
// }





// //show roles in dropdown

// export const getRoles = async () => {
//     try {
//         const [result] = await pool.execute(
//             `SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
//              WHERE TABLE_NAME = 'users' AND COLUMN_NAME = 'role'`
//         );

//         if (result.length > 0) {
//             const columnType = result[0].COLUMN_TYPE; // e.g., "enum('Admin','User','IP Team','MC Team')"
//             return columnType.match(/'([^']+)'/g).map(role => role.replace(/'/g, ""));
//         }
//         return [];
//     } catch (error) {
//         console.error("Error fetching roles:", error);
//         throw error;
//     }
// };


// //update approvedusers into rejected user


// export const updateapproveduser=async(id)=>{

//     const [result]=await pool.execute(`update users set status="rejected" where id=?`,[id])
//     return result;

// }



// export const requestPasswordReset = async (email, otp) => {
//     const [result] = await pool.execute(
//         `UPDATE users SET otp=? WHERE email=?`,
//         [otp, email]
//     );
//     return result;
// };

// // ---------------------- 2. VERIFY RESET OTP ----------------------
// export const verifyResetOtp = async (email, otp) => {
//     const [result] = await pool.execute(
//         `SELECT * FROM users WHERE email=? AND otp=?`,
//         [email, otp]
//     );
//     return result[0];
// };

// // ---------------------- 3. RESET PASSWORD ----------------------
// export const updatePassword = async (email, newPassword) => {
//     const [result] = await pool.execute(
//         `UPDATE users SET password=?, otp=NULL WHERE email=?`,
//         [newPassword, email]
//     );
//     return result;
// };


import express from "express";
import pool from "../config/database.js";

// ---------------------- 1. CREATE USER (SIGNUP) ----------------------
export const createuser = async (username, email, password, otp) => {
    const [result] = await pool.execute(
        `INSERT INTO zentraappusers (username, email, password, otp, status, role) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [username, email, password, otp, "unverified", "User"]
    );
    return result;
};

// ---------------------- 2. VERIFY OTP ----------------------
export const verifyotp = async (email, otp) => {
    const [result] = await pool.execute(
        `SELECT * FROM zentraappusers WHERE email = ? AND otp = ?`,
        [email, otp]
    );
    return result[0];
};

// ---------------------- 3. AFTER OTP → SET STATUS = PENDING ----------------------
export const approveuserafterotp = async (email) => {
    const [result] = await pool.execute(
        `UPDATE zentraappusers SET otp = NULL, status = "pending" WHERE email = ?`,
        [email]
    );
    return result;
};

// ---------------------- 4. GET USER BY EMAIL ----------------------
export const getUserByEmail = async (email) => {
    const [result] = await pool.execute(
        `SELECT * FROM zentraappusers WHERE email = ?`,
        [email]
    );
    return result[0];
};

// ---------------------- 5. GET USER PROFILE (OPTIONAL FEATURE) ----------------------
export const getUserProfileByEmail = async (email) => {
    const [result] = await pool.execute(
        `SELECT Image_URL FROM User_Profiles WHERE Email_ID = ?`,
        [email]
    );
    return result[0] ? result[0].Image_URL : null;
};



// ---------------------- 6. ADMIN APPROVES USER ----------------------
export const approveuser = async (userid, role) => {
    const [result] = await pool.execute(
        `UPDATE zentraappusers SET status = ?, role = ? WHERE id = ?`,
        ["approved", role, userid]
    );
    return result;
};

// ---------------------- 7. GET USER BY ID ----------------------
export const getuserbyId = async (id) => {
    const [result] = await pool.execute(
        `SELECT username, email FROM zentraappusers WHERE id = ?`,
        [id]
    );
    return result[0];
};

// ---------------------- 8. GET APPROVED USERS ----------------------
export const getapproveusers = async () => {
    const [result] = await pool.execute(
        `SELECT id, username, email, role FROM zentraappusers WHERE status = "approved"`
    );
    return result;
};

export const updateapproveduserstatus = async (id, username, email, role) => {
  const [result] = await pool.execute(
    `UPDATE zentraappusers 
     SET username = ?, email = ?, role = ? 
     WHERE id = ? AND status = "approved"`,
    [username, email, role, id]
  );
  return result;
};



// ---------------------- 9. GET PENDING USERS ----------------------
export const getpendinguser = async () => {
    const [result] = await pool.execute(
        `SELECT * FROM zentraappusers WHERE status = "pending"`
    );
    return result;
};

// ---------------------- 10. REJECT USER ----------------------
export const rejectuser = async (userid) => {
    const [result] = await pool.execute(
        `UPDATE zentraappusers SET status = "rejected" WHERE id = ?`,
        [userid]
    );
    return result;
};

// ---------------------- 11. GET REJECTED USERS ----------------------
export const getrejectuser = async () => {
    const [result] = await pool.execute(
        `SELECT username, email, status FROM zentraappusers WHERE status = "rejected"`
    );
    return result;
};

// ---------------------- 12. ROLE DROPDOWN (ADMIN + USER ONLY) ----------------------
export const getRoles = async () => {
    try {
        const [result] = await pool.execute(
            `SELECT COLUMN_TYPE 
             FROM INFORMATION_SCHEMA.COLUMNS 
             WHERE TABLE_NAME = 'zentraappusers' 
             AND COLUMN_NAME = 'role'`
        );

        if (result.length > 0) {
            return result[0].COLUMN_TYPE.match(/'([^']+)'/g)
                .map(role => role.replace(/'/g, ""));
        }
        return [];
    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
    }
};

// ---------------------- 13. UPDATE APPROVED → REJECTED ----------------------
export const updateapproveduser = async (id) => {
    const [result] = await pool.execute(
        `UPDATE zentraappusers SET status = "rejected" WHERE id = ?`,
        [id]
    );
    return result;
};

// ---------------------- 14. REQUEST PASSWORD RESET ----------------------
export const requestPasswordReset = async (email, otp) => {
    const [result] = await pool.execute(
        `UPDATE zentraappusers SET otp = ? WHERE email = ?`,
        [otp, email]
    );
    return result;
};

// ---------------------- 15. VERIFY RESET OTP ----------------------
export const verifyResetOtp = async (email, otp) => {
    const [result] = await pool.execute(
        `SELECT * FROM zentraappusers WHERE email = ? AND otp = ?`,
        [email, otp]
    );
    return result[0];
};

// ---------------------- 16. RESET PASSWORD ----------------------
export const updatePassword = async (email, newPassword) => {
    const [result] = await pool.execute(
        `UPDATE zentraappusers SET password = ?, otp = NULL WHERE email = ?`,
        [newPassword, email]
    );
    return result;
};
