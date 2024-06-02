import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import './styles.css';

const SubmitLeaveRequest = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const storedEmployeeId = useSelector(state => state.auth.employeeId); // Fetch employeeId from Redux store

  const handleSubmit = (event) => {
    const validationErrors = {};
    if (!startDate) {
      validationErrors.startDate = 'Start date is required';
    }
    if (!endDate) {
      validationErrors.endDate = 'End date is required';
    }
    if (!leaveType) {
      validationErrors.leaveType = 'Leave type is required';
    }
    if (!reason) {
      validationErrors.reason = 'Reason is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
    event.preventDefault();
    const leaveRequestData = {
      employeeId: storedEmployeeId, // Use the employeeId from Redux store
      startDate,
      endDate,
      leaveType,
      reason
    };
    EmployeeService.submitLeaveRequest(leaveRequestData)
      .then(() => {
        alert('Leave request submitted successfully');
        navigate('/employee');
      })
      .catch(error => {
        console.error('Error submitting leave request:', error);
        alert('Failed to submit leave request. Please try again later.');
      });
    }
  };

  return (
    <div className='blur-background'>
      <div className='leaves-form-container'>
        <h2 className='text-center'>Submit Leave Request</h2>
        <form onSubmit={handleSubmit}>
          {/* Employee ID field removed since it's fetched from Redux store */}
          <div className='mb-3'>
            <label htmlFor='startDate' className='form-label'>Start Date</label>
            <input type='date' className='form-control' id='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='endDate' className='form-label'>End Date</label>
            <input type='date' className='form-control' id='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='leaveType' className='form-label'>Leave Type</label>
            <select className='form-select' id='leaveType' value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required>
              <option value=''>Select Leave Type</option>
              <option value='SICK_LEAVE'>Sick Leave</option>
              <option value='MATERNITY_LEAVE'>Maternity Leave</option>
              <option value='UNPAID_LEAVE'>Unpaid Leave</option>
              <option value='PAID_LEAVE'>Paid Leave</option>
              <option value='PATERNITY_LEAVE'>Paternity Leave</option>
              <option value='OTHER'>OTHER</option>
              {/* Add other leave types as needed */}
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='reason' className='form-label'>Reason</label>
            <textarea className='form-control' id='reason' value={reason} onChange={(e) => setReason(e.target.value)} required />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to="/employee" className="btn btn-secondary">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SubmitLeaveRequest;
