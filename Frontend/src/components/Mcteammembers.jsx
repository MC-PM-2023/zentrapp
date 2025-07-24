import React from 'react';
import '../css/mcteam.css'
const teamMembers = [
  { name: "Vinithra A", role: "" },
  { name: "Rashikha R", role: "" },
  { name: "Harish K", role: "" },
  { name: "Dhanush S", role: "" },
  { name: "Chinnarasu M", role: "" },
  { name: "Haritha Priyadharshini A", role: "" },
  { name: "Michael Raj M", role: "" },
  { name: "Nivedha Ramesh", role: "" },
  { name: "Bruntha Devi", role: "" },
  { name: "Piriskillal S", role: "" },
  { name: "Revathy T", role: "" },
  { name: "RamKumar V", role: "" },
  
];

const OurMCTeam = () => {
  return (
    <div className="container teams my-1">
       <hr/>
      <h2 className="text-center mb-4 text-white">Our Team </h2>
      <div className="row text-center">
        {teamMembers.map((member, index) => (
          <div className="col-md-4 mb-4 " key={index}>
            <div className="card h-100 shadow-sm border-0 teammembers">
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurMCTeam;
