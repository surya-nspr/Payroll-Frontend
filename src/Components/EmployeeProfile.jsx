import React from 'react';

const EmployeeProfile = ({ name, email, salary, position }) => {
  return (
    <div className="card" style={{ backgroundColor: 'transparent' }}>
      <div className="card-body">
        <div>
          <strong>Name:</strong> {name}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>Salary:</strong> {salary}
        </div>
        <div>
          <strong>Position:</strong> {position}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
