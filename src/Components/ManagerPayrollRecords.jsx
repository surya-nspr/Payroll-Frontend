import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ManagerService from '../Services/ManagerService';

const PayrollRecords = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const managerId = useSelector(state => state.auth.managerId);

  useEffect(() => {
    const fetchPayrollRecords = async () => {
      try {
        if (managerId) {
          const response = await ManagerService.reviewTeamPayrolls(managerId);
          console.log(response.data);
          setPayrollRecords(response.data);
        }
      } catch (error) {
        console.error('Error fetching payroll records:', error);
        setPayrollRecords([]); // Reset payroll records
      }
    };

    fetchPayrollRecords();
  }, [managerId]); // Fetch records whenever managerId changes

  return (
    <div className='container'>
      <h2 className='text-center'>Payroll Records by Manager</h2>
      {payrollRecords.length > 0 ? (
        <table className='table table-bordered table-striped'>
          <thead className='bg-lightblue'>
            <tr>
              <th>Payroll Record ID</th>
              <th>Employee Id</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th>Total Deductions</th>
              <th>Tax Amount</th>
              <th>Status</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody className='bg-skyblue'>
            {payrollRecords.map(record => (
              <tr key={record.recordId}>
                <td>{record.recordId}</td>
                <td>{record.employee ? record.employee.employeeId : 'N/A'}</td>
                <td>{record.basicSalary}</td>
                <td>{record.netSalary}</td>
                <td>{record.deductions}</td>
                <td>{record.tax}</td>
                <td>{record.status}</td>
                {/* Render more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payroll records found for the provided manager ID.</p>
      )}
    </div>
  );
};

export default PayrollRecords;
