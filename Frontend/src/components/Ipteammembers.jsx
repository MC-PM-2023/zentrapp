

const teamMembers = [
  { name: "Megha M", role: "" },
  { name: "Brito Raj S", role: "" },
  { name: "Sathish", role: "" },
  { name: "Auxcilia Mary L", role: "" },
  { name: "Janaki P", role: "" }, 
];


const OurIPTeam = () => {
  return (
    <div className="container-fluid teams my-1">
      <h2 className="text-center text-white mb-4">Our Team</h2>
      <div className="row text-center">
        {teamMembers.map((member, index) => (
          <div className="col-md-4 mb-4" key={index}>
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

export default OurIPTeam;
