// import express from 'express';
// import cors from 'cors'
// import dotenv from 'dotenv';
// import pool from './config/database.js';
// import AuthRouter from './routes/Authroutes.js';
// import Adminrouter from './routes/Adminroutes.js';
// import Approuter from './routes/Approutes.js';
// import { userProfilesRouter } from './routes/Userprofilesroutes.js';
// import { fileURLToPath } from 'url'

// const app=express()


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// dotenv.config();


// const port=process.env.PORT;



// app.use(express.json())
// app.use(cors())

// app.use(express.static(path.join(__dirname, '../Frontend/dist')));


// app.use("/",(req,res)=>{
//    res.send("Api is Working")
// })


// app.use("/api/auth",AuthRouter)
// app.use("/api/admin",Adminrouter)
// app.use('/api/admin/apps',Approuter)
// app.use("/api/userprofiles",userProfilesRouter)


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
// });


// app.listen(port,()=>{
//     console.log("Server is Running on Port:",port)
// })

//error code below 
// import express from 'express';
// import cors from 'cors'
// import dotenv from 'dotenv';
// import pool from './config/database.js';
// import Authrouter from './routes/Authroutes.js'
// import Adminrouter from './routes/Adminroutes.js';
// import Approuter from './routes/Approutes.js';
// import { userProfilesRouter } from './routes/Userprofilesroutes.js';
// import { fileURLToPath } from 'url'
// import path from 'path';



// dotenv.config();

// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const port = process.env.PORT || 8080;

// // app.use(cors());
// app.use(cors({
//   origin: [
//     "https://zentra.datasolve-analytics.net", 
//     "http://localhost:5173",
//    "https://zentraapp-mocha.vercel.app",
//     "https://zentra-rho.vercel.app",
//     "https://zentrapp.vercel.app",
//    "https://refsolve.datasolve-analytics.net"


//     // optional for local dev
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// app.options('*', cors()); // Enable pre-flight for all routes


// // Middleware
// app.use(express.json());


// // API routes
// app.use("/api/auth", Authrouter);
// app.use("/api/admin", Adminrouter);
// app.use("/api/admin/apps", Approuter);
// app.use("/api/userprofiles", userProfilesRouter);


// // Serve static frontend files
// // app.use(express.static(path.join(__dirname, 'Frontend/dist')));
// const frontendDist = path.join(__dirname, '../Frontend/dist');

// app.use(express.static(frontendDist));




// // Catch-all for frontend SPA
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendDist, 'index.html'));
// });


// // Start server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import Authrouter from './routes/Authroutes.js';
// import Adminrouter from './routes/Adminroutes.js';
// import Approuter from './routes/Approutes.js';
// import { userProfilesRouter } from './routes/Userprofilesroutes.js';

// dotenv.config();
// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const port = process.env.PORT || 8080;

// // ✅ Allowed origins
// const allowedOrigins = [
//   "https://refsolve.datasolve-analytics.net",
//   "https://zentra.datasolve-analytics.net",
//   "https://zentra.datasolve-analytics.net/api/auth/validatetoken",
//   "http://localhost:5173",
// ];

// // ✅ CORS middleware
// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true); // allow non-browser requests
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by CORS"), false);
//     }
//   },
//   credentials: true,
//   methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // ✅ Ensure preflight OPTIONS requests are handled
// app.options('*', cors({
//   origin: allowedOrigins,
//   credentials: true,
//   methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());

// // ===== API Routes =====
// app.use("/api/auth", Authrouter);
// app.use("/api/admin", Adminrouter);
// app.use("/api/admin/apps", Approuter);
// app.use("/api/userprofiles", userProfilesRouter);

// // ===== Serve frontend SPA =====
// const frontendDist = path.join(__dirname, '../Frontend/dist');
// app.use(express.static(frontendDist));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendDist, 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Authrouter from './routes/Authroutes.js';
import Adminrouter from './routes/Adminroutes.js';
import Approuter from './routes/Approutes.js';
import { userProfilesRouter } from './routes/Userprofilesroutes.js';
import logrouter from './routes/logactivityroutes.js';
import { Herorouter } from './routes/Heroroutes.js';
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8080;

// ✅ Allowed frontend origins

const allowedOrigins = [
  "https://refsolve.datasolve-analytics.net",
  "https://zentra.datasolve-analytics.net",
  "http://localhost:5173",
];

// ✅ CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);

    // allow if origin is in whitelist
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // reject by not setting CORS headers (don't throw error)
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle OPTIONS preflight for all routes
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ===== API Routes =====
app.use("/api/auth", Authrouter);
app.use("/api/admin", Adminrouter);
app.use("/api/admin/apps", Approuter);
app.use("/api/userprofiles", userProfilesRouter);
app.use("/api/log",logrouter)
app.use("/api/user",Herorouter)

// ===== Serve frontend SPA =====
const frontendDist = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendDist));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
