import React, { useState, useEffect } from 'react';
import '../css/mcteam.css';
import axios from 'axios';

const OurTeam = () => {
  const [profiles, setUserProfiles] = useState([]);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_API_URL;

  const fetchShowProfiles = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/userprofiles/getuserprofiles`);
      let data = response.data.data;
      // Remove admin profile
data = data.filter(
  member => member.Email_ID !== "apps.admin@datasolve-analytics.com"
);


      // Sort by Employee_ID
      data.sort((a, b) => {
        // Extract numeric part after 'DS' prefix
        const idA = a.Employee_ID ? parseInt(a.Employee_ID.replace(/\D/g, ''), 10):0;
        const idB = b.Employee_ID ? parseInt(b.Employee_ID.replace(/\D/g, ''), 10):0;
        return idA - idB;
      });

      setUserProfiles(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch profiles');
    }
  };

  useEffect(() => {
    fetchShowProfiles();
  }, []);

  return (
    <div className="container-fluid my-5">
      <hr className="mb-5" />
      <div className="row justify-content-center g-4 teammembers">
        <h4 className="text-center text-dark fw-bold" id="teams">Our Team</h4>
        {error && <p className="text-danger text-center">{error}</p>}
        {/* {profiles.map((member, index) => (
          <div className="col-lg-2 col-md-3 col-sm-6 col-10" key={index}>
            <div className="card h-100 border-0 shadow-sm">
              {/* Image *
              <div className="ratio ratio-1x1 overflow-hidden">
                <img
                  src={member.Image_URL}
                  alt={member.Name}
                  className="card-img-top object-fit-contain rounded-circle"
                />
              </div>

              {/* Body *
              <div className="card-body text-center">
                <h6 className="card-title fw-semibold mb-1">{member.Name}</h6>
                <small className="text-muted d-block mb-3">{member.Designation}</small>

                {/* Social Icons *
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
        ))} */}

        {profiles.map((member, index) => (
  <div className="col-lg-2 col-md-3 col-sm-6 col-10" key={index}>
    
    <div className="team-card shadow-sm">

      {/* Image + Hover Layer */}
      <div className="image-box">
        <img
          src={member.Image_URL}
          alt={member.Name}
          className="profile-img"
        />

        {/* Hover Icons Layer */}
        <div className="hover-icons">

          {member.LinkedIn_URL && (
            <a href={member.LinkedIn_URL} target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin"></i>
            </a>
          )}

          {member.Email_ID && (
            <a href={`mailto:${member.Email_ID}`}>
              <i className="bi bi-envelope"></i>
            </a>
          )}

          {member.Slack_URL && (
            <a href={member.Slack_URL} target="_blank" rel="noopener noreferrer">
              <i className="bi bi-slack"></i>
            </a>
          )}

        </div>
      </div>

      {/* Text */}
   <div className="text-center mt-2">
    <h6 className="fw-bold mb-1">{member.Name}</h6>

    <small className="text-muted d-block">
        {member.Designation}
    </small>
</div>


    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default OurTeam;
