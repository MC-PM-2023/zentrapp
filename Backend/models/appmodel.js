// import express from 'express';
// import pool from '../config/database.js';


// export const addappmodelcard=async(appname,appdescription,applink,assignedteam,appprofilelink,apptagline)=>{
//     const [result]=await pool.execute(
//         `insert into projects (appname,appdescription,applink,assignedteam,appprofilelink,apptagline) values(?,?,?,?,?,?)`,[appname,appdescription,applink,assignedteam,appprofilelink,apptagline]
//     )
//     return result;
// }


// export const getcreatedappsbyteam=async(assignedteam)=>{

//     const[result]=await pool.execute(
//         `select * from projects where assignedteam= ? order by created_at desc`,[assignedteam]
//     )
//     return result;
// }


// import pool from "../config/database.js";

// // Add a new app
// export const addApp = async (appname, appdescription, applink, appprofilelink, apptagline) => {
//     const [result] = await pool.execute(
//         `INSERT INTO apps (app_name, app_description, app_url, app_logo, app_tagline)
//          VALUES (?, ?, ?, ?, ?)`,
//         [appname, appdescription, applink, appprofilelink, apptagline]
//     );
//     return result;
// };




// // Assign app to user using user_id
// export const assignAppsToUser = async (email, appNames) => {
//     // Split appNames if sent as comma-separated string
//     const appList = typeof appNames === "string" ? appNames.split(",") : appNames;

//     // Get user_id
//     const [user] = await pool.execute(`SELECT id FROM zentraappusers WHERE email = ?`, [email]);
//     if (!user[0]) throw new Error("User not found");
//     const userId = user[0].id;

//     const results = [];
//     for (const appName of appList) {
//         const [app] = await pool.execute(`SELECT id FROM apps WHERE app_name = ?`, [appName.trim()]);
//         if (!app[0]) continue; // skip if app not found
//         const appId = app[0].id;

//         const [result] = await pool.execute(
//             `INSERT INTO user_app_assignments (user_id, app_id) VALUES (?, ?)`,
//             [userId, appId]
//         );
//         results.push(result);
//     }

//     return results;
// };





// // Get apps assigned to a user by email
// export const getAppsByUserEmail = async (email) => {

//     const [user] = await pool.execute(
//         `SELECT id FROM zentraappusers WHERE email = ?`,
//         [email]
//     );

//     if (!user[0]) throw new Error("User not found");
//     const userId = user[0].id;

//     const [apps] = await pool.execute(
//         `SELECT a.*
//          FROM apps a
//          JOIN user_app_assignments ua ON a.id = ua.app_id
//          WHERE ua.user_id = ?`,
//         [userId]
//     );

//     return apps;
// };


// export const getAllAppsdata=async()=>{
//     const[apps]=await pool.execute(
//         `select * from apps order by created_at desc`
//     )
//     return apps;

// }



import pool from "../config/database.js";

// Add App
export const addApp = async (appname, appdescription, applink, appprofilelink, apptagline,appisometriclink) => {
  const [result] = await pool.execute(
    `INSERT INTO apps (app_name, app_description, app_url, app_logo, app_tagline,app_isometric_link)
     VALUES (?, ?, ?, ?, ?,?)`,
    [appname, appdescription, applink, appprofilelink, apptagline,appisometriclink]
  );
  return result;
};

// Update App by ID
// export const updateAppById = async (appId, appname, appdescription, applink, appprofilelink, apptagline,appisometriclink) => {
//   const [result] = await pool.execute(
//     `UPDATE apps 
//      SET app_name=?, app_description=?, app_url=?, app_logo=?, app_tagline=? , app_isometric_link=?
     
//      WHERE id=?`,



//     [appname, appdescription, applink, appprofilelink, apptagline, appId,appisometriclink]
//   );
//   return result;
// };

export const updateAppById = async (
  appId, appname, appdescription, applink, appprofilelink, apptagline, appisometriclink
) => {
  const [result] = await pool.execute(
    `UPDATE apps 
     SET app_name=?, app_description=?, app_url=?, app_logo=?, app_tagline=?, app_isometric_link=?
     WHERE id=?`,
    [appname, appdescription, applink, appprofilelink, apptagline, appisometriclink, appId]
  );
  return result;
};


// Delete App by ID
export const deleteAppById = async (appId) => {
  const [result] = await pool.execute(`DELETE FROM apps WHERE id=?`, [appId]);
  return result;
};

// Assign App(s) to User
// export const assignAppsToUser = async (email, appNames) => {
//   const appList = typeof appNames === "string" ? appNames.split(",") : appNames;

//   const [user] = await pool.execute(`SELECT id FROM zentraappusers WHERE email = ?`, [email]);
//   if (!user[0]) throw new Error("User not found");
//   const userId = user[0].id;

//   const results = [];
//   for (const appName of appList) {
//     const [app] = await pool.execute(`SELECT id FROM apps WHERE app_name = ?`, [appName.trim()]);
//     if (!app[0]) continue;
//     const appId = app[0].id;
//     const [result] = await pool.execute(
//       `INSERT INTO user_app_assignments (user_id, app_id) VALUES (?, ?)`,
//       [userId, appId]
//     );
//     results.push(result);
//   }
//   return results;
// };

export const assignAppsToUser = async (email, appNames) => {
  const appList = Array.isArray(appNames) ? appNames : appNames.split(",");

  const [user] = await pool.execute(`SELECT id FROM zentraappusers WHERE email = ?`, [email]);
  if (!user[0]) throw new Error("User not found");
  const userId = user[0].id;

  const results = [];
  for (const appName of appList) {
    const [app] = await pool.execute(`SELECT id FROM apps WHERE app_name = ?`, [appName.trim()]);
    if (!app[0]) continue;
    const appId = app[0].id;

    const [result] = await pool.execute(
      `INSERT INTO user_app_assignments (user_id, app_id) VALUES (?, ?)`,
      [userId, appId]
    );

    results.push(appName); // return app names assigned
  }

  return results;
};


// Get Apps by User Email
export const getAppsByUserEmail = async (email) => {
  const [user] = await pool.execute(`SELECT id FROM zentraappusers WHERE email=?`, [email]);
  if (!user[0]) throw new Error("User not found");
  const userId = user[0].id;

  const [apps] = await pool.execute(
    `SELECT a.* FROM apps a 
     JOIN user_app_assignments ua ON a.id=ua.app_id 
     WHERE ua.user_id=?`,
    [userId]
  );
  return apps;
};

// Get All Apps
// export const getAllAppsdata = async () => {
//   const [apps] = await pool.execute(`SELECT * FROM apps ORDER BY created_at DESC`);
//   return apps;
// };


// export const getAllAppsdata = async () => {
//   // Fetch all apps
//   const [apps] = await pool.execute(`SELECT * FROM apps ORDER BY created_at DESC`);

//   // Fetch all assignments
//   const [assignments] = await pool.execute(`
//     SELECT ua.app_id, u.id as user_id, u.username, u.email
//     FROM user_app_assignments ua
//     JOIN zentraappusers u ON ua.user_id = u.id
//   `);

//   // Map assigned users to each app
//   const appsWithUsers = apps.map(app => {
//     const assignedUsers = assignments
//       .filter(a => a.app_id === app.id)
//       .map(u => ({ id: u.user_id, username: u.username, email: u.email }));
//     return { ...app, assignedUsers };
//   });

//   return appsWithUsers;
// };

export const getAllAppsdata = async () => {
    
    const [apps] = await pool.execute(`
        SELECT * FROM apps ORDER BY created_at DESC
    `);

    const [assignments] = await pool.execute(`
        SELECT 
            ua.app_id,
            u.id AS user_id,
            u.username,
            u.email,
            p.Image_URL AS profilelink
        FROM user_app_assignments ua
        JOIN zentraappusers u ON ua.user_id = u.id
        LEFT JOIN User_Profiles p ON p.Email_ID = u.email
    `);

    const appsWithUsers = apps.map(app => {
        const assignedUsers = assignments
          .filter(a => a.app_id === app.id)
          .map(a => ({
              id: a.user_id,
              username: a.username,
              email: a.email,
              profilelink: a.profilelink
          }));

        return { ...app, assignedUsers };
    });

    return appsWithUsers;
};




//remove assignApp function
export const removeAssignedApp = async (email, appNames) => {
  // Convert string → array (if comma-separated)
  const appList = typeof appNames === "string"
    ? appNames.split(",").map(a => a.trim())
    : appNames;

  // Get user
  const [user] = await pool.execute(
    `SELECT id FROM zentraappusers WHERE email=?`,
    [email]
  );
  if (!user[0]) throw new Error("User not found");
  const userId = user[0].id;

  const results = [];

  for (const appName of appList) {
    // Get app
    const [app] = await pool.execute(
      `SELECT id FROM apps WHERE app_name=?`,
      [appName]
    );

    if (!app[0]) {
      results.push({ appName, status: "App not found" });
      continue;
    }

    const appId = app[0].id;

    // Delete assignment
    const [deleted] = await pool.execute(
      `DELETE FROM user_app_assignments WHERE user_id=? AND app_id=?`,
      [userId, appId]
    );

    results.push({
      appName,
      deleted: deleted.affectedRows > 0,
    });
  }

  return results;
};

//update all assigned apps for a user
export const updateUserApps = async (email, appsArray) => {
  const [user] = await pool.execute(
    `SELECT id FROM zentraappusers WHERE email=?`,
    [email]
  );
  if (!user[0]) throw new Error("User not found");
  const userId = user[0].id;

  // Remove all existing assignments
  await pool.execute(`DELETE FROM user_app_assignments WHERE user_id=?`, [userId]);

  const results = [];

  for (const appName of appsArray) {
    const [app] = await pool.execute(
      `SELECT id FROM apps WHERE app_name=?`,
      [appName]
    );
    if (!app[0]) continue;
    const appId = app[0].id;

    const [insert] = await pool.execute(
      `INSERT INTO user_app_assignments (user_id, app_id) VALUES (?, ?)`,
      [userId, appId]
    );

    results.push(insert);
  }

  return results;
};



//log for edit app
export const getAppById = async (appId) => {
  const [rows] = await pool.execute(
    `SELECT * FROM apps WHERE id = ?`,
    [appId]
  );
  return rows;
};


