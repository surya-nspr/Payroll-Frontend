import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ManagerService from '../Services/ManagerService';

const Manager = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const managerId = useSelector(state => state.auth.managerId);

  const handleGetLeaveRequests = () => {
    ManagerService.getLeaveRequestsByManagerId(managerId)
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave requests:', error);
        setLeaveRequests([]);
      });
  };

  const handleApprove = (requestId) => {
    if (requestId) {
      ManagerService.approveLeaveRequest(requestId)
        .then(() => {
          console.log('Leave request approved successfully');
          // Refresh leave requests after approval
          handleGetLeaveRequests();
        })
        .catch(error => {
          console.error('Error approving leave request:', error);
        });
    } else {
      console.log("No leave request selected");
    }
  };

  const handleReject = (requestId) => {
    const reason = prompt("Please enter the reason for rejecting the leave request:");
    if (reason !== null) { // User didn't cancel
      ManagerService.rejectLeaveRequest(requestId, reason)
        .then(() => {
          console.log('Leave request rejected successfully');
          // Refresh leave requests after rejection
          handleGetLeaveRequests();
        })
        .catch(error => {
          console.error('Error rejecting leave request:', error);
        });
    }
  };

  useEffect(() => {
    if (managerId) {
      handleGetLeaveRequests();
    }
  }, [managerId]); // Fetch leave requests whenever managerId changes

  return (
    <div className='container'>
      <h2 className='text-center'>Leave Requests</h2>
      {managerId ? (
        <>
          {leaveRequests.length > 0 ? (
            <table className='table table-bordered table-striped' style={{ backgroundColor: '#f0f8ff' }}>
              <thead className='table-dark'>
                <tr>
                <th>Leave ID</th>
                <th>Employee Id</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>LeaveType</th>
                <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(leave => (
                  <tr key={leave.requestId}>
                    <td>{leave.requestId}</td>
                    <td>{leave.employee.employeeId}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{leave.status}</td>
                    <td>{leave.leaveType}</td>
                    <td>
                      <button className='btn btn-success' onClick={() => handleApprove(leave.requestId)}>Approve</button>
                      <button className='btn btn-danger' onClick={() => handleReject(leave.requestId)}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No leave requests found for the provided manager ID.</p>
          )}
        </>
      ) : (
        <p>Please provide a valid manager ID.</p>
      )}
    </div>
  );
};

export default Manager;
