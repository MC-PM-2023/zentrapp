
import { useState,useEffect } from "react"
import axios from 'axios';
import OurMCTeam from "./Mcteammembers";



const OurIPTeam = () => {

  const [error,setError]=useState(null)
const[userProfiles,setUserProfiles]=useState([])
  const apiurl=import.meta.env.VITE_API_URL
 
  

  const fetchUserProfiles=async()=>{
  try{
    const response=await axios.get(`${apiurl}/api/userprofiles/getuserprofiles`)
   
    // console.log(response.data)
    setUserProfiles(response.data.data)
  }
  catch(error){
setError(error)
  }
}


useEffect(()=>{
  fetchUserProfiles()
},[])


const allowedNames=['M Megha','L Auxcilia Mary','P Janaki','S Brito Raj','P Sathish Kumar']

  return (
    <div className="container-fluid my-2">
 
      <div className="row justify-content-center gx-4  teammembers">
             <h4 className="text-center text-dark  fw-bold" 
             id="team">Our Team</h4>



        {Array.isArray(userProfiles) && (userProfiles.filter(member=>allowedNames.includes(member.Name)).
        map((member, index) => (
          <div className="col-md-2 col-sm-6" key={index}>
            <div className="card h-100 border-0 shadow-sm">
              
              {/* Image container */}
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img
                  src={member.Image_URL}
                  alt={member.Name}
                  className="card-img-top img-fluid object-fit-contain w-100 "
                />
              </div>

              {/* Card body */}
              <div className="card-body text-center">
                <h6 className="card-title fw-semibold mb-1">{member.Name}</h6>
                <small className="text-muted d-block mb-3">{member.Designation}</small>

                {/* Social icons */}
                <div className="d-flex justify-content-center gap-3">
                  {member.LinkedIn_URL && (
                    <a href={member.LinkedIn_URL} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <i className="bi bi-linkedin text-dark fs-5"></i>
                    </a>
                  )}

                  {member.Email_ID && (
                    <a href={`mailto:${member.Email_ID}`} title={member.Email_ID}>
                      <i className="bi bi-envelope text-dark fs-5"></i>
                    </a>
                  )}

                  {member.Slack_URL && (
                    <a href={member.Slack_URL} target="_blank" rel="noopener noreferrer" title="Slack">
                      <i className="bi bi-slack text-dark fs-5"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )))}

      
      </div>
      
    </div>
  );
};

export default OurIPTeam;
