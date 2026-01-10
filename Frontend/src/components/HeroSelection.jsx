//corrected floating label logos code
// import React, { useEffect, useState, useMemo } from "react";
// import '../css/heroselection.css'

// const HeroSelection = () => {
//   const [heroLogos, setHeroLogos] = useState([]);
//   const [apps, setApps] = useState([]);

//   const apiurl = import.meta.env.VITE_API_URL;

  

//   // Fetch hero logos
//   const fetchHeroLogos = async () => {
//     try {
//       const res = await fetch(`${apiurl}/api/user/usersectionlogos`);
//       const json = await res.json();
//       if (json.success) setHeroLogos(json.data);
//     } catch (err) {
//       console.error("Error fetching hero logos:", err);
//     }
//   };

//   // Fetch apps

//   useEffect(() => {
//     fetchHeroLogos();
   
//   }, []);


//     const username = localStorage.getItem('username');

//   // Determine center logo + floating logos
//   const { centerLogoUrl, logosToScatter } = useMemo(() => {
//     let center =
//       "https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Isometric_logo/DataSolve.png";

//     let scatter = [];

//     if (heroLogos?.length > 0) {
//       const first = heroLogos[0];
//       center =
//         first.image_link ||    // Correct field from API
//         first.imagelink ||
//         first["Image link"] ||
//         first["image link"] ||
//         center;

//       scatter = heroLogos.slice(1);
//     }

//     return { centerLogoUrl: center, logosToScatter: scatter };
//   }, [heroLogos]);

//   // Floating positions
//   const slots = useMemo(() => [
//     { L:10, T:12 }, { L:25, T:8 }, { L:50, T:8 }, { L:75, T:8 }, { L:90, T:12 },
//     { L:10, T:88 }, { L:25, T:92 }, { L:50, T:92 }, { L:75, T:92 }, { L:90, T:88 },
//     { L:8, T:35 }, { L:8, T:65 }, { L:92, T:35 }, { L:92, T:65 },
//     { L:20, T:25 }, { L:80, T:25 }, { L:20, T:75 }, { L:80, T:75 }
//   ], []);

//   const shuffled = [...slots].sort(() => Math.random() - 0.5);
//   const anims = ["float", "drift", "orbit"];


 

//   return (
//     <div className="container my-2 ">

//       {/* Floating animations */}
//       {/* <style>{`
//         @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
//         @keyframes drift { 0%,100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
//         @keyframes orbit { from { transform: rotate(0deg) translateX(6px); } to { transform: rotate(360deg) translateX(6px); } }
//       `}</style> */}

//       {/* Hero Box */}
//       <div className="position-relative  shadow-sm border bg-white mb-4 "
//            style={{ height: "450px", overflow: "hidden", borderRadius:"20px" }}>
   
//         {/* <img
//           src="https://storage.googleapis.com/my-react-image-bucket-123/Background%20Images/Background%20Video/Backgroundvideo8.mp4"
//           className="position-absolute top-0 start-0 w-100 h-100"
//           style={{ objectFit:"cover" }}
//         /> */}
//                        {/* <video
//   src="https://storage.googleapis.com/my-react-image-bucket-123/Background%20Images/Background%20Video/Backgroundvideo8.mp4"
//   className="position-absolute top-0 start-0 w-100 h-100"
//   style={{ objectFit: "cover", zIndex: -0 }}
//   autoPlay 
//   loop
//   muted
//   playsInline
// /> */}

//                 <video
//   src="https://storage.googleapis.com/my-react-image-bucket-123/Celebrations/Pongal/Pongal_Video_01.mp4"
//   className="position-absolute top-0 start-0 w-100 h-100"
//   style={{ objectFit: "cover", zIndex: -0 }}
//   autoPlay 
//   loop
//   muted
//   playsInline
// />




//         {/* Floating logos */}
//         <div className="position-absolute top-0 start-0 w-100 h-100">
//           {logosToScatter.slice(0, shuffled.length).map((logo, i) => {
//             const img =
//               logo.image_link ||
//               logo.imagelink ||
//               logo["Image link"] ||
//               logo["image link"];
//             if (!img) return null;

//             const pos = shuffled[i];
//             const anim = anims[Math.floor(Math.random()*anims.length)];

//             return (
//               <div
//                 key={i}
//                 className="position-absolute d-flex justify-content-center align-items-center"
//                 style={{
//                   left:`${pos.L}%`,
//                   top:`${pos.T}%`,
//                   width:90,
//                   height:90,
//                   transform:"translate(-50%,-50%)",
//                   animation:`${anim} ${10+Math.random()*10}s infinite ease-in-out`,
                 
//                 }}
//               >
//                 <img src={img} className="w-100 h-100" style={{ objectFit:"contain" }}/>
//               </div>
//             );
//           })}
//         </div>

//         {/* Center logo */}
//         {/* <div className="position-relative h-100 d-flex align-items-center justify-content-center">
//           <div className="d-flex align-items-center gap-3">
//             <img
//               src={centerLogoUrl}
//               style={{ height:"120px", objectFit:"contain" }}
//               onError={e => e.target.style.display="none"}
//             />
//             <h1 className="fw-bold mb-0">

//               <span style={{color:"#0d6efd", fontSize:40}}>Data</span>
//               <span style={{color:"#ff8800" , fontSize:40}}>Solve </span>
//               <span style={{color:"#555", fontSize:40}}>Analytics</span>
              
//             </h1>
        
//           </div>
//         </div> */}
//     <div className="position-relative h-100 d-flex flex-column align-items-center justify-content-center text-center gap-3 ">

//   {/* Logo + Main Title in one row */}
//   <div className="d-flex align-items-center ">
//     <img
//       src={centerLogoUrl}
//       style={{ height: "120px", objectFit: "contain",  marginLeft:100}}
//       onError={(e) => (e.target.style.display = "none")}
//       alt="Center Logo"
//     />

//     <h1 className="fw-bold mb-0 mt-3">
//       <span style={{ color: "#278490", fontSize: 40 }}>Data</span>
//       <span style={{ color: "#ff8800", fontSize: 40 }}>Solve </span>
//       <span style={{ color: "#555", fontSize: 40 }}>Analytics</span>
//     </h1>
//   </div>

//   {/* Welcome Text below */}
//   <div className=" " style={{ marginLeft:260}}>
 
// <h3
//   className="welcome-text "
//   style={{
//     color: "#A3D78A",
//     fontWeight: "700",
//     fontSize: "1.8rem",
   
//   }}
// >
//   Welcome to 
  
// <span
//   className="fs-2 herosection"
//   style={{
//     background: 'linear-gradient(90deg, #DC2F87, #BF2BDD, #2B9DDD, #322A31, #DB1603, #228D0D)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent', // makes the text show the gradient
//     textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
//     fontWeight: 700,
//    textAlign:"end",
//     display: 'inline-block'

//   }}
// >
//  Zentra,
// </span>



//   <span className="fs-2"> {username}</span>
// </h3>



//     <h6 style={{ color: " #3d3d5c", marginBottom: 0 ,marginLeft:20 }} className="username">
//       The center of everything that drives your work.
//     </h6>
//     <h6 style={{ color: " #3d3d5c", marginTop: 4 }}>
//       <em className="description">Centralize. Simplify. Succeed.</em>
//     </h6>
//   </div>
// </div>

//       </div>

//       {/* Apps Grid */}
//       <div className="row g-1">
//         {apps.map(app => (
//           <div key={app.id} className="col-6 col-md-4 col-lg-3">
//             <div className="card h-100 shadow-sm">
//               <img
//                 src={app.applogo}
//                 className="card-img-top p-2"
//                 // style={{ objectFit:"contain", height:"150px" }}
//                   style={{
//                 left: `${pos.L}%`,
//                 top: `${pos.T}%`,
               
//                 width: 70,
//                 height: 95,
//                 borderRadius: "18px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
//                 backgroundColor: "rgba(255, 255, 255, 0.7)",
//                 backdropFilter: "blur(6px)",
//                 transform: "translate(-50%, -50%)",
//                 animation: `${anim} ${12 + Math.random() * 10}s ease-in-out infinite`,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//               />
//               <div className="card-body text-center">
//                 <h5 className="card-title">{app.app_name}</h5>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default HeroSelection;





import React, { useEffect, useState, useMemo ,useRef} from "react";
import '../css/heroselection.css'

const HeroSelection = () => {
  const [heroLogos, setHeroLogos] = useState([]);
  const [apps, setApps] = useState([]);

 const videoRef = useRef(null);
const hasPlayedOnce = useRef(false);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  video.muted = true;

  const handleEnded = () => {
    // First full play finished
    hasPlayedOnce.current = true;
    video.currentTime = Math.max(video.duration - 2, 0);
    video.play();
  };

  const handleTimeUpdate = () => {
    // Loop only last 2 seconds
    if (
      hasPlayedOnce.current &&
      video.currentTime >= video.duration
    ) {
      video.currentTime = video.duration - 2;
      video.play();
    }
  };

  video.addEventListener("ended", handleEnded);
  video.addEventListener("timeupdate", handleTimeUpdate);

  video.play().catch(() => {});

  return () => {
    video.removeEventListener("ended", handleEnded);
    video.removeEventListener("timeupdate", handleTimeUpdate);
  };
}, []);


  const apiurl = import.meta.env.VITE_API_URL;

  

  // Fetch hero logos
  const fetchHeroLogos = async () => {
    try {
      const res = await fetch(`${apiurl}/api/user/usersectionlogos`);
      const json = await res.json();
      if (json.success) setHeroLogos(json.data);
    } catch (err) {
      console.error("Error fetching hero logos:", err);
    }
  };

  // Fetch apps

  useEffect(() => {
    fetchHeroLogos();
   
  }, []);


    const username = localStorage.getItem('username');

  // Determine center logo + floating logos
  const { centerLogoUrl, logosToScatter } = useMemo(() => {
    let center =
      "https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Isometric_logo/DataSolve.png";

    let scatter = [];

    if (heroLogos?.length > 0) {
      const first = heroLogos[0];
      center =
        first.image_link ||    // Correct field from API
        first.imagelink ||
        first["Image link"] ||
        first["image link"] ||
        center;

      scatter = heroLogos.slice(1);
    }

    return { centerLogoUrl: center, logosToScatter: scatter };
  }, [heroLogos]);

  // Floating positions
  const slots = useMemo(() => [
    { L:10, T:12 }, { L:25, T:8 }, { L:50, T:8 }, { L:75, T:8 }, { L:90, T:12 },
    { L:10, T:88 }, { L:25, T:92 }, { L:50, T:92 }, { L:75, T:92 }, { L:90, T:88 },
    { L:8, T:35 }, { L:8, T:65 }, { L:92, T:35 }, { L:92, T:65 },
    { L:20, T:25 }, { L:80, T:25 }, { L:20, T:75 }, { L:80, T:75 }
  ], []);

  const shuffled = [...slots].sort(() => Math.random() - 0.5);
  const anims = ["float", "drift", "orbit"];


 

  return (
    <div className="container my-3">

  

      {/* Hero Box */}
      <div className="position-relative  shadow-sm border bg-white mb-4 "
           style={{ height: "550px", overflow: "hidden", borderRadius:"20px" }}>


                <video
  src="https://storage.googleapis.com/my-react-image-bucket-123/Celebrations/Pongal/Pongal_Video_01.mp4"
  
  className="position-absolute top-0 start-0 w-100 h-100"
  style={{ objectFit: "cover", zIndex: -0 ,height:"100%"}}
  autoPlay 
 
  muted
  playsInline
/>





    


      </div>
     
 {/* <span className='text-center'>Welcome to Datasolve Analytics {username}</span> */}
<div className="d-flex align-items-center justify-content-center my-2">



</div>


      {/* Apps Grid */}
      <div className="row g-1">
        {apps.map(app => (
          <div key={app.id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={app.applogo}
                className="card-img-top p-2"
                // style={{ objectFit:"contain", height:"150px" }}
                  style={{
                left: `${pos.L}%`,
                top: `${pos.T}%`,
               
                width: 70,
                height: 95,
                borderRadius: "18px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(6px)",
                transform: "translate(-50%, -50%)",
                animation: `${anim} ${12 + Math.random() * 10}s ease-in-out infinite`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{app.app_name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
  
    </div>
  );
};

export default HeroSelection;
