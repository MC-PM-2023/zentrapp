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


import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import pool from './config/database.js';
import Authrouter from './routes/Authroutes.js'
import Adminrouter from './routes/Adminroutes.js';
import Approuter from './routes/Approutes.js';
import { userProfilesRouter } from './routes/Userprofilesroutes.js';
import { fileURLToPath } from 'url'
import path from 'path';



dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: [
    "https://zentra.datasolve-analytics.net", 
    "http://localhost:5173",
   "https://zentraapp-mocha.vercel.app",
    "https://zentra-rho.vercel.app",
    "https://zentrapp.vercel.app",
   " https://refsolve.datasolve-analytics.net"


    // optional for local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Serve static frontend files
// app.use(express.static(path.join(__dirname, 'Frontend/dist')));
const frontendDist = path.join(__dirname, '../Frontend/dist');

app.use(express.static(frontendDist));



// API routes
app.use("/api/auth", Authrouter);
app.use("/api/admin", Adminrouter);
app.use("/api/admin/apps", Approuter);
app.use("/api/userprofiles", userProfilesRouter);

// Catch-all for frontend SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
