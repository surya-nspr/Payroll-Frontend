import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PayrollProcessorService from '../Services/PayrollProcessorService';

const ProcessorPayrollRecords = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const processorId = useSelector(state => state.auth.payrollProcessorId);

  const fetchPayrollRecords = async () => {
    try {
      const response = await PayrollProcessorService.getPayrollRecordsByProcessorId(processorId);
      setPayrollRecords(response.data);
    } catch (error) {
      console.error('Error fetching payroll records by processor:', error);
      setPayrollRecords([]); // Reset payroll records
    }
  };

  useEffect(() => {
    if (processorId) {
      fetchPayrollRecords();
    }
  }, [processorId]); // Fetch records whenever processorId changes

  return (
    <div className='container'>
      <h2 className='text-center'>Payroll Records by Processor</h2>
      {payrollRecords.length > 0 ? (
        <table className='table table-bordered table-striped' style={{ backgroundColor: 'skyblue' }}>
          <thead>
            <tr>
              <th>Payroll Record ID</th>
              <th>Employee ID</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th>Total Deductions</th>
              <th>Tax Amount</th>
              <th>Date</th>
              <th>Status</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {payrollRecords.map(record => (
              <tr key={record.recordId}>
                <td>{record.recordId}</td>
                <td>{record.employee.employeeId}</td>
                <td>{record.basicSalary}</td>
                <td>{record.netSalary}</td>
                <td>{record.deductions}</td>
                <td>{record.tax}</td>
                <td>{record.payrollDate}</td>
                <td>{record.status}</td>
                {/* Render more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payroll records found for the provided processor ID.</p>
      )}
    </div>
  );
};

export default ProcessorPayrollRecords;
