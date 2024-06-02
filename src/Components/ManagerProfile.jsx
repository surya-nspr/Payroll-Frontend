import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ManagerService from '../Services/ManagerService';

const ManagerProfile = () => {
  const [manager, setManager] = useState({}); // Initialize as an object
  const managerId = useSelector(state => state.auth.managerId);

  const handleGetManager = () => {
    ManagerService.getManagerById(managerId)
      .then(response => {
        setManager(response.data);
      })
      .catch(error => {
        console.error('Error fetching manager:', error);
        setManager({}); // Reset manager
      });
  };

  // Fetch manager details when component mounts or when managerId changes
  useEffect(() => {
    if (managerId) {
      handleGetManager();
    }
  }, [managerId]); // Fetch manager whenever managerId changes

  return (
    <div className="container">
      <h2 className="text-center">Manager Details</h2>
      {manager.managerId ? (
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th className="bg-info text-white">Manager ID</th>
              <td>{manager.managerId}</td>
            </tr>
            <tr>
              <th className="bg-info text-white">First Name</th>
              <td>{manager.firstName}</td>
            </tr>
            <tr>
              <th className="bg-info text-white">Last Name</th>
              <td>{manager.lastName}</td>
            </tr>
            <tr>
              <th className="bg-info text-white">Gender</th>
              <td>{manager.gender}</td>
            </tr>
            <tr>
              <th className="bg-info text-white">Phone Number</th>
              <td>{manager.phoneNumber}</td>
            </tr>
            <tr>
            <th className="bg-info text-white">Position</th>
            <td>{manager.position}</td>
          </tr>
            {/* Add more rows for additional details */}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No manager found for the provided ID.</p>
      )}
    </div>
  );
};

export default ManagerProfile;
