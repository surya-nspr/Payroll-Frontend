import React, { useState, useEffect } from 'react';
import EmployeeService from '../Services/EmployeeService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import './Color.css';
import { useSelector } from 'react-redux'; // Import useSelector hook

const PayrollRecords = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const storedEmployeeId = useSelector(state => state.auth.employeeId); // Fetch employee ID from Redux store

  useEffect(() => {
    if (storedEmployeeId) {
      // Fetch payroll records when component mounts
      EmployeeService.getPayrollRecordsById(storedEmployeeId)
        .then(response => {
          setPayrollRecords(response.data);
        })
        .catch(error => {
          console.error('Error fetching payroll records:', error);
          setPayrollRecords([]); // Reset payroll records
        });
    }
  }, [storedEmployeeId]);

  const handleDownloadPDF = (record) => {
    const input = document.getElementById(`payrollTable-${record.recordId}`);

    html2canvas(input, { scale: 2, allowTaint: true, useCORS: true }).then(canvas => {
      const pdf = new jsPDF('p', 'pt', 'a4'); // Use 'pt' for units
      const imgData = canvas.toDataURL('image/png'); // Get the canvas data URL

      // Calculate the aspect ratio for resizing the image
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      // Add the resized image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio);

      // Save the PDF file
      pdf.save(`payroll_record_${record.recordId}.pdf`);
    });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Payroll Records by Employee</h2>
      {payrollRecords.length > 0 ? (
        <div id='payrollTables'>
          {payrollRecords.map(record => (
            <div className='colored-table' key={record.recordId}>
              <table className='table table-bordered' id={`payrollTable-${record.recordId}`}>
                <thead>
                  <tr>
                    <th>Field Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Payroll Record ID</td>
                    <td>{record.recordId}</td>
                  </tr>
                  <tr>
                    <td>Basic Salary</td>
                    <td>{record.basicSalary}</td>
                  </tr>
                  <tr>
                    <td>Net Salary</td>
                    <td>{record.netSalary}</td>
                  </tr>
                  <tr>
                    <td>Total Deductions</td>
                    <td>{record.deductions}</td>
                  </tr>
                  <tr>
                    <td>Tax Amount</td>
                    <td>{record.tax}</td>
                  </tr>
                  <tr>
                    <td>Payroll Date</td>
                    <td>{record.payrollDate}</td>
                  </tr>
                  {/* Add more columns as needed */}
                </tbody>
              </table>
              <button className='btn btn-success' onClick={() => handleDownloadPDF(record)}>Download PDF</button>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No payroll records found for the provided employee ID.</p>
      )}
    </div>
  );
};

export default PayrollRecords;
