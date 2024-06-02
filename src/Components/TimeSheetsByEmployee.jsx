import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';
import { useSelector } from 'react-redux';

const TimeSheetsByEmployee = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const storedEmployeeId = useSelector(state => state.auth.employeeId);

  useEffect(() => {
    if (storedEmployeeId) {
      EmployeeService.getTimeSheetsById(storedEmployeeId)
        .then(response => {
          console.log('Time Sheets response:', response.data);
          setTimeSheets(response.data);
        })
        .catch(error => {
          console.error('Error fetching time sheets:', error);
          setTimeSheets([]); // Reset time sheets
        });
    }
  }, [storedEmployeeId]);

  return (
    <div className='container'>
      <h2 className='text-center'>Time Sheets by Employee</h2>
      {timeSheets.length > 0 ? (
        <table className='table table-bordered table-striped' style={{ backgroundColor: '#f0f8ff' }}>
          <thead className='table-dark'>
            <tr>
              <th>Time Sheet ID</th>
              <th>Employee Id</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Hours Worked</th>
              <th>OverTime</th>
              <th colSpan='2'>Actions</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
          {timeSheets.map(sheet => (
            <tr key={sheet.timeSheetId}>
              <td>{sheet.timeSheetId}</td>
              <td>{sheet.employee ? sheet.employee.employeeId : 'N/A'}</td> {/* Null check */}
              <td>{sheet.startDate}</td>
              <td>{sheet.endDate}</td>
              <td>{sheet.hoursWorked}</td>
              <td>{sheet.overTime}</td>
              <td><Link to={`/employee/updateTimeSheet/${sheet.timeSheetId}`} className='btn btn-success'>Update</Link></td>
              {/* Render more columns as needed */}
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p>No time sheets found for the provided employee ID.</p>
      )}
    </div>
  );
};

export default TimeSheetsByEmployee;
