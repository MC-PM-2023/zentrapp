//dynamic
// import { appConfig } from "../config/appConfig.js";
import pool from "../config/database.js";

// export const getUserAssignedChartApps = async () => {
//   const response = {};

//   for (const app of appConfig) {
//     try {
//       // Fully qualify table with database name
//       const tableName = `\`${app.dbName}\`.\`${app.table}\``;

//       // Determine role column or default
//       const roleSelect = app.roleColumn
//         ? `IFNULL(${app.roleColumn}, 'user') AS role`
//         : `'user' AS role`;

//       const sql = `
//         SELECT ${app.emailColumn} AS email, ${roleSelect}
//         FROM ${tableName}
//       `;

//       const [rows] = await pool.execute(sql);

//       // Initialize app group if not exists
//       if (!response[app.appName]) response[app.appName] = [];

//       // Push all users for this app
//       rows.forEach((row) => {
//         response[app.appName].push({
//           email: row.email,
//           role: row.role
//         });
//       });
//     } catch (err) {
//       console.error(`❌ ${app.appName}:`, err.message);
//     }
//   }

//   return response;
// };


//static
// export const getUserAssignedChartApps = async () => {
//     const [rows] = await pool.execute(
//         `SELECT * FROM ds_suite_roles `
//     );
//     return rows;
// };


export const getUserAssignedChartApps = async () => {
    const [rows] = await pool.execute(
        `SELECT r.id, r.username, u.Email_ID, u.Image_URL,
                r.Zentra, r.RefSolve, r.InSolvo, r.\`InSolvo Lite\`,
                r.Trove, r.PubDock, r.Zyncus, r.Kaizen, r.Elicita,
                r.PriorIQ, r.Analytica, r.Logsy, r.Fynback,
                r.\`DS Fileshare\`, r.Overseer, r.Corriza
         FROM ds_suite_roles r
         JOIN User_Profiles u ON r.email = u.Email_ID`
    );
    return rows;
};

