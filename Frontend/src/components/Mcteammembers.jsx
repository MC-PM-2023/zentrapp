import React from 'react';
import '../css/mcteam.css'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';






const OurMCTeam = () => {

const[profiles,setUserProfiles]=useState([])
const[error,setError]=useState(null)

const apiURL=import.meta.env.VITE_API_URL;
// console.log(apiURL)

const fetchShowProfiles=async()=>{
  const response=await axios.get(`${apiURL}/api/userprofiles/getuserprofiles`)
//  console.log(response.data.data)
  setUserProfiles(response.data.data)

}

useEffect(()=>{
fetchShowProfiles()
},[])

const allowedNames=['A Vinithra','S Dhanush','T Revathy','M Micheal Raj','K Bruntha Devi','V Ramkumar','M Chinnarasu','R Nivedha','A Haritha Priyadharshini','S Piriskillal','K Harish']











  return (
    <div className="container-fluid my-5">
      <hr className="mb-5" />
     

      <div className="row justify-content-center g-4 teammembers">
         <h4 className="text-center text-dark fw-bold " id="teams">Our Team</h4>
        {Array.isArray(profiles) && profiles.filter(member=>allowedNames.includes(member.Name)).map((member, index) => (
          <div className="col-lg-2 col-md-3 col-sm-6 col-10" key={index}>
            <div className="card h-100 border-0 shadow-sm">
              
              {/* Image */}
              <div className="ratio ratio-1x1 overflow-hidden">
                <img
                  src={member.Image_URL}
                  alt={member.Name}
                  className="card-img-top object-fit-contain"
                 
                />
              </div>

              {/* Body */}
              <div className="card-body text-center">
                <h6 className="card-title fw-semibold mb-1">{member.Name}</h6>
                <small className="text-muted d-block mb-3">{member.Designation}</small>

                {/* Social Icons */}
                <div className="d-flex justify-content-center gap-3">
                  {member.LinkedIn_URL && (
                    <a href={member.LinkedIn_URL} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <i className="bi bi-linkedin text-dark fs-5"></i>
                    </a>
                  )}
                  {member.Email_ID && (
                    <a href={`mailto:${member.Email_ID}`} title={member.email}>
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
        ))}
      </div>
    </div>
  );
};

export default OurMCTeam;
