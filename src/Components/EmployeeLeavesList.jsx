import React, { useState, useEffect } from 'react';
import EmployeeService from '../Services/EmployeeService';
import { useSelector } from 'react-redux';

const EmployeesLeavesList = () => {
  const [leaves, setLeaves] = useState([]);
  const storedEmployeeId = useSelector(state => state.auth.employeeId);

  useEffect(() => {
    if (storedEmployeeId) {
      EmployeeService.getLeavesById(storedEmployeeId)
        .then(response => {
          console.log(' Leaves response:', response.data);
          setLeaves(response.data);
        })
        .catch(error => {
          console.error('Error fetching Leaves:', error);
          setLeaves([]); // Reset time sheets
        });
    }
  }, [storedEmployeeId]);

  return (
    <div className='container'>
      <h2 className='text-center'> Leaves by Employee</h2>
      {leaves.length > 0 ? (
        <table className='table table-bordered table-striped' style={{ backgroundColor: '#f0f8ff' }}>
          <thead className='table-dark'>
            <tr>
              <th>Leave ID</th>
              <th>Employee Id</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>LeaveType</th>
            </tr>
          </thead>
          <tbody>
          {leaves.map(leave => (
            <tr key={leave.requestId}>
              <td>{leave.requestId}</td>
              <td>{leave.employee ? leave.employee.employeeId : 'N/A'}</td> {/* Null check */}
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
              <td>{leave.leaveType}</td>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p>No Leaves List found for the provided employee ID.</p>
      )}
    </div>
  );
};

export default EmployeesLeavesList;
