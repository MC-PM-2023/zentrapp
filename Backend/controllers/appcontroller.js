// import { addappmodelcard, getcreatedappsbyteam } from "../models/appmodel.js"
//old code
// export const createapp=async(req,res)=>{


//     const {appname,appdescription,applink,assignedteam,appprofilelink,apptagline}=req.body;
// if( !appname || !appdescription || !applink || !assignedteam || !appprofilelink ||!apptagline){
//     return res.status(400).json({message:"All fields are required !"})
// }

// try{
    
//     await addappmodelcard(appname,appdescription,applink,assignedteam,appprofilelink,apptagline)
//     return res.status(200).json({message:"App added Successfully !"})

// }
// catch(error){
//     console.log("Error in adding projects:",error)
//     return res.status(500).json({message:"Error in adding createapp controller"})

// }
// }

// export const getappsbyteam=async(req,res)=>{


//     const {team}=req.params;
//     if (!team) {
//         return res.status(400).json({ message: "Team parameter is missing" });
//     }
// try{
//     const result=await getcreatedappsbyteam(team);
//     console.log("Fetching apps for team:", result); 
//     return res.status(200).json(result)
    
// }
// catch(error){
//     console.log("Error in getappsbyteam controller:",error)
//     return res.status(500).json({message:"Error in getappsbyteam controller:",error:error.message})

// }

// }

// import { addApp, assignAppsToUser, getAppsByUserEmail,getAllAppsdata } from "../models/appmodel.js";

// // Admin adds a new app
// export const createApp = async (req, res) => {
//     const { appname, appdescription, applink, appprofilelink, apptagline } = req.body;

//     if (!appname || !appdescription || !applink || !appprofilelink || !apptagline) {
//         return res.status(400).json({ message: "All fields are required!" });
//     }

//     try {
//         await addApp(appname, appdescription, applink, appprofilelink, apptagline);
//         res.status(200).json({ message: "App added successfully!" });
//     } catch (err) {
//         console.error("Error adding app:", err);
//         res.status(500).json({ message: "Error adding app", error: err.message });
//     }
// };




// // Admin assigns app to user by email
// export const assignApp = async (req, res) => {
//     const { email, appname } = req.body;

//     if (!email || !appname) {
//         return res.status(400).json({ message: "Email and appname are required" });
//     }

//     // If multiple apps: "elicita,refsolve"
//     const appList = appname.split(',').map(a => a.trim());

//     try {
//         for (const app of appList) {
//             await assignAppsToUser(email, app);
//         }

//         return res.status(200).json({
//             message: `Apps assigned to ${email}`,
//             assigned: appList
//         });

//     } catch (err) {
//         console.error("Error assigning apps:", err);
//         return res.status(500).json({ message: "Error assigning apps", error: err.message });
//     }
// };


// // User fetches apps assigned to them

// export const getMyApps = async (req, res) => {
//     // Pass email as query param or body
//     const userEmail = req.query.email || req.body.email;

//     if (!userEmail) {
//         return res.status(400).json({ message: "Email is required" });
//     }

//     try {
//         const apps = await getAppsByUserEmail(userEmail);
//         res.status(200).json(apps);
//     } catch (err) {
//         console.error("Error fetching apps:", err);
//         res.status(500).json({ message: "Error fetching apps", error: err.message });
//     }
// };


// export const getAllApps = async (req, res) => {


//     try {
//         const apps = await getAllAppsdata();
//        return  res.status(200).json(apps);
//     } catch (err) {
//         console.error("Error fetching apps:", err);
//         res.status(500).json({ message: "Error fetching apps", error: err.message });
//     }
// };



import {
  addApp,
  updateAppById,
  deleteAppById,
  assignAppsToUser,
  getAppsByUserEmail,
  getAllAppsdata,
  removeAssignedApp,
  getAppById
  
} from "../models/appmodel.js";
import { saveActivity } from "../models/logactivitymodel.js";
import pool from "../config/database.js";


const ACT = {
    ADD_APP: "ADD_APP",
    UPDATE_APP: "UPDATE_APP",
    DELETE_APP: "DELETE_APP",
    ASSIGN_APP: "ASSIGN_APP",
    UNASSIGN_APP:"UNASSIGN_APP",
    REMOVE_APP: "REMOVE_APP",
    LOGIN: "LOGIN"
};


// Create App
// export const createApp = async (req, res) => {
//   const { appname, appdescription, applink, appprofilelink, apptagline } = req.body;
//   if (!appname || !appdescription || !applink || !appprofilelink || !apptagline)
//     return res.status(400).json({ message: "All fields are required!" });

//   try {
//     await addApp(appname, appdescription, applink, appprofilelink, apptagline);

//        await saveActivity(
// req.user.username,
//             ACT.ADD_APP,
//             "App",
//             appname,
//             null,
//             req.body,
//             `Added new app "${appname}".` //log
//         );
//     res.status(200).json({ message: "App added successfully!" });
//   } catch (err) {
//     console.error("Error adding app:", err);
//     res.status(500).json({ message: "Error adding app", error: err.message });
//   }
// };


export const createApp = async (req, res) => {
  const { appname, appdescription, applink, appprofilelink, apptagline, assignedUsers ,appisometriclink } = req.body;
  if (!appname || !appdescription || !applink || !appprofilelink || !apptagline || !appisometriclink)
    return res.status(400).json({ message: "All fields are required!" });

  try {
    // 1️⃣ Add the app
    const result = await addApp(appname, appdescription, applink, appprofilelink, apptagline,appisometriclink);

    const appId = result.insertId; // ID of new app

    // 2️⃣ Assign users if provided
    if (Array.isArray(assignedUsers)) {
      for (const email of assignedUsers) {
        const [user] = await pool.execute(
          `SELECT id FROM zentraappusers WHERE email = ?`,
          [email]
        );
        if (!user[0]) continue; // skip invalid emails

        await pool.execute(
          `INSERT INTO user_app_assignments (user_id, app_id) VALUES (?, ?)`,
          [user[0].id, appId]
        );
      }
    }

    // 3️⃣ Log activity
    await saveActivity(
      req.user.username,
      ACT.ADD_APP,
      "App",
      appname,
      null,
      { appname, appdescription, applink, appprofilelink, apptagline, assignedUsers ,appisometriclink},
      `Added new app "${appname}".`
    );

    res.status(200).json({ message: "App added successfully!", appId });

  } catch (err) {
    console.error("Error adding app:", err);
    res.status(500).json({ message: "Error adding app", error: err.message });
  }
};


// Edit App
// export const editApp = async (req, res) => {
//   const { appId } = req.params;
//   const { appname, appdescription, applink, appprofilelink, apptagline } = req.body;

//   if (!appname || !appdescription || !applink || !appprofilelink || !apptagline)
//     return res.status(400).json({ message: "All fields are required!" });

//   try {
//     await updateAppById(appId, appname, appdescription, applink, appprofilelink, apptagline);
//       await saveActivity(
//             req.user.username,
//             ACT.UPDATE_APP,
//             "App",
//             req.body.appname,
//             oldApp,
//             req.body,
//             `Updated app "${req.body.appname}".` //log
//         );

//     res.status(200).json({ message: "App updated successfully!" });
//   } catch (err) {
//     console.error("Error updating app:", err);
//     res.status(500).json({ message: "Error updating app", error: err.message });
//   }
// };


export const editApp = async (req, res) => {
  const { appId } = req.params;
  const { appname, appdescription, applink, appprofilelink, apptagline, appisometriclink } = req.body;

  if (!appname || !appdescription || !applink || !appprofilelink || !apptagline ||!appisometriclink) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const oldRows = await getAppById(appId);

    if (!oldRows.length) {
      return res.status(404).json({ message: "App not found!" });
    }

    const oldApp = oldRows[0];

    await updateAppById(appId, appname, appdescription, applink, appprofilelink, apptagline,appisometriclink);

    await saveActivity(
      req.user.username,
      ACT.UPDATE_APP,
      "App",
      appname,
      oldApp,
      req.body,
      `Updated app "${appname}".`
    );

    res.status(200).json({ message: "App updated successfully!" });

  } catch (err) {
    console.error("Error updating app:", err);
    res.status(500).json({ message: "Error updating app", error: err.message });
  }
};



// Delete App
// export const deleteApp = async (req, res) => {
//   const { appId } = req.params;
//   if (!appId) return res.status(400).json({ message: "App ID is required" });

//   try {
//     await deleteAppById(appId);
//     await saveActivity(
           
//             ACT.DELETE_APP,
//             "App",
//             old.appname,
//             old,
//             null,
//             `Deleted app "${old.appname}".` //log
//         );

//     res.status(200).json({ message: "App deleted successfully!" });
//   } catch (err) {
//     console.error("Error deleting app:", err);
//     res.status(500).json({ message: "Error deleting app", error: err.message });
//   }
// };

export const deleteApp = async (req, res) => {
  const { appId } = req.params;

  if (!appId) {
    return res.status(400).json({ message: "App ID is required" });
  }

  try {
    // 1️⃣ Fetch old app before deleting
    const [oldData] = await getAppById(appId);
    if (!oldData) {
      return res.status(404).json({ message: "App not found!" });
    }

    const oldApp = { ...oldData }; // store for logs

    // 2️⃣ Delete the app
    await deleteAppById(appId);
// console.log("Decoded user:", req.user);

    // 3️⃣ Log delete action (newValue = null)
    await saveActivity(
      req.user.username,
      ACT.DELETE_APP,
      "App",
      oldApp.app_name, // target_name
      oldApp,          // old_value
      null,            // new_value
      `Deleted app "${oldApp.app_name}".`
    );

    res.status(200).json({ message: "App deleted successfully!" });

  } catch (err) {
    console.error("Error deleting app:", err);
    res.status(500).json({ message: "Error deleting app", error: err.message });
  }
};


// Assign Apps to User
// export const assignApp = async (req, res) => {
//   const { email, appname } = req.body;
//   if (!email || !appname)
//     return res.status(400).json({ message: "Email and appname are required" });

//   const appList = appname.split(",").map(a => a.trim());
//   try {
//     for (const app of appList) {
//       await assignAppsToUser(email, app);
//     }
//     return res.status(200).json({ message: `Apps assigned to ${email}`, assigned: appList });
//   } catch (err) {
//     console.error("Error assigning apps:", err);
//     return res.status(500).json({ message: "Error assigning apps", error: err.message });
//   }
// };
export const assignApp = async (req, res) => {
  let { emails, appnames } = req.body; // expect arrays

  if (!emails || !appnames) {
    return res.status(400).json({ message: "Emails and appnames are required" });
  }

  if (typeof emails === "string") emails = emails.split(",").map(e => e.trim());
  if (typeof appnames === "string") appnames = appnames.split(",").map(a => a.trim());

  const results = [];
  const failures = [];

  //using email
//   for (const email of emails) {
//     try {
//       const assigned = await assignAppsToUser(email, appnames);
//  await saveActivity(
//             req.user.username,
//             ACT.ASSIGN_APP,
//             "User–App Mapping",
//             `${emails.join(",")} → ${appnames.join(",")}`,
//             null,
//             { emails, appnames },
//             `Granted access to ${appnames.join(",")}`
//         ); //log

//       results.push({ email, assignedApps: assigned });
//     } catch (err) {
//       failures.push({ email, error: err.message });
//     }
//   }
//using username
for (const email of emails) {
  try {
    const username = email.split('@')[0]; // Extract the username from email
    const assigned = await assignAppsToUser(email, appnames);
    
    // Log with the username instead of the email
    await saveActivity(
      req.user.username,
      ACT.ASSIGN_APP,
      "User–App Mapping",
      `${emails.map(e => e.split('@')[0]).join(", ")} → ${appnames.join(", ")}`,  // Showing only usernames
      null,
      { emails, appnames },
      `Granted access to ${appnames.join(", ")}`
    ); //log

    results.push({ email, assignedApps: assigned });
  } catch (err) {
    failures.push({ email, error: err.message });
  }
}

  return res.status(200).json({
    message: "Apps assignment completed",
    success: results,
    failed: failures
  });
};





export const unassignApp = async (req, res) => {
  const { email, appname } = req.body;

  if (!email || !appname)
    return res.status(400).json({ message: "Email & appname are required" });

  try {
    const result = await removeAssignedApp(email, appname);
await saveActivity(
            req.user.username,
            ACT.REMOVE_APP,
            "User–App Mapping",
            `${user.username} → ${appname}`,
          
            { access:"Granted" },
            { access:"Revoked" },
            `Removed access`
        );
    return res.status(200).json({
      message: `App '${appname}' removed from ${email}`,
      result
    });
  } catch (err) {
    console.error("Error removing app:", err);
    return res.status(500).json({ message: "Error removing app", error: err.message });
  }
};

// export const updateAssignedApps = async (req, res) => {
//   const { email, apps } = req.body;

//   if (!email || !apps)
//     return res.status(400).json({ message: "Email & apps array are required" });

//   if (!Array.isArray(apps))
//     return res.status(400).json({ message: "Apps must be an array" });

//   try {
//     const updated = await updateUserApps(email, apps);

//     return res.status(200).json({
//       message: `Apps updated successfully for ${email}`,
//       updatedApps: updated
//     });

//   } catch (err) {
//     console.error("Error updating user apps:", err);
//     return res.status(500).json({ message: "Error updating user apps", error: err.message });
//   }
// };

// export const updateAssignedApps = async (req, res) => {
//   try {
//     const appId = req.params.id;
//     const { assignedUsers } = req.body; // array of user emails

//     if (!Array.isArray(assignedUsers)) {
//       return res.status(400).json({ message: "assignedUsers must be an array" });
//     }

//     // Remove all users assigned to this app
//     await pool.execute(
//       `DELETE FROM user_app_assignments WHERE app_id = ?`,
//       [appId]
//     );

//     // Assign new users to this app
//     for (const email of assignedUsers) {
//       const [user] = await pool.execute(
//         `SELECT id FROM zentraappusers WHERE email = ?`,
//         [email]
//       );
      
//       if (!user[0]) continue; // ignore invalid users

//       await pool.execute(
//         `INSERT INTO user_app_assignments (user_id, app_id) VALUES (?, ?)`,
//         [user[0].id, appId]
//       );
//     }

//     return res.status(200).json({
//       message: "Assigned users updated successfully",
//       appId,
//       assignedUsers
//     });

//   } catch (error) {
//     console.error("Error updating assigned users:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


export const updateAssignedApps = async (req, res) => {
  try {
    const appId = req.params.id;
    const { assignedUsers } = req.body; // array of user emails

    if (!Array.isArray(assignedUsers)) {
      return res.status(400).json({ message: "assignedUsers must be an array" });
    }

    // Get app name for logging; fallback to "Deleted App" if app is removed
    const [appData] = await pool.execute(
      `SELECT app_name FROM apps WHERE id = ?`,
      [appId]
    );
    const appName = appData[0]?.app_name || "Deleted App";
    console.log("App name:",appName)

    // Get currently assigned users BEFORE removing them
    const [oldUsers] = await pool.execute(
      `SELECT z.email 
       FROM user_app_assignments ua
       JOIN zentraappusers z ON z.id = ua.user_id
       WHERE ua.app_id = ?`,
      [appId]
    );

    const oldAssigned = oldUsers.map(u => u.email);

    // Remove all users assigned to this app
    await pool.execute(`DELETE FROM user_app_assignments WHERE app_id = ?`, [appId]);

    // Determine users that were unassigned
    const removedUsers = oldAssigned.filter(email => !assignedUsers.includes(email));

    // Log removed users
    for (const email of removedUsers) {
      try {
        await saveActivity(
          req.user.username,
          ACT.REMOVE_APP,
          "User–App Mapping",
          `${email} → ${appName}`,
          { access: "Granted" },
          { access: "Revoked" },
          `Removed access ${appName}`
        );


        
      } catch (err) {
        console.error("Failed to log removed user:", email, err);
      }
    }

    // Assign new users to this app
    for (const email of assignedUsers) {
      const [user] = await pool.execute(
        `SELECT id FROM zentraappusers WHERE email = ?`,
        [email]
      );

      if (!user[0]) continue; // skip invalid users

      await pool.execute(
        `INSERT INTO user_app_assignments (user_id, app_id) VALUES (?, ?)`,
        [user[0].id, appId]
      );

      // Log newly assigned users
      if (!oldAssigned.includes(email)) {
        try {
          await saveActivity(
            req.user.username,
            ACT.ASSIGN_APP,
            "User–App Mapping",
            `${email} → ${appName}`,
            { access: "Revoked" },
            { access: "Granted" },
            "Assigned access"
          );
        } catch (err) {
          console.error("Failed to log assigned user:", email, err);
        }
      }
    }

    return res.status(200).json({
      message: "Assigned users updated successfully",
      appId,
      assignedUsers,
    });

  } catch (error) {
    console.error("Error updating assigned users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Get apps assigned to user
export const getMyApps = async (req, res) => {
  const userEmail = req.query.email || req.body.email;
  if (!userEmail) return res.status(400).json({ message: "Email is required" });

  try {
    const apps = await getAppsByUserEmail(userEmail);
    res.status(200).json(apps);
  } catch (err) {
    console.error("Error fetching apps:", err);
    res.status(500).json({ message: "Error fetching apps", error: err.message });
  }
};

// Get all apps
export const getAllApps = async (req, res) => {
  try {
    
    const apps = await getAllAppsdata();
    res.status(200).json(apps);
  } catch (err) {
    console.error("Error fetching apps:", err);
    res.status(500).json({ message: "Error fetching apps", error: err.message });
  }
};
