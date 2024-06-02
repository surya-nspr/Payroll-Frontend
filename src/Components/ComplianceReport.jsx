import React, { useState, useEffect } from 'react';
import AdminService from '../Services/AdminService';

const ComplianceReportList = () => {
    const [complianceReports, setComplianceReports] = useState([]);

    const fetchAllComplianceReports = () => {
        AdminService.getAllComplianceReports()
            .then(response => {
                setComplianceReports(response.data);
            })
            .catch(error => {
                console.error('Error fetching compliance reports:', error);
            });
    };

    useEffect(() => {
        fetchAllComplianceReports();
    }, []);

    const deleteComplianceReport = (id) => {
        console.log('Delete compliance report handler fired. ID:', id);
        // Implement delete functionality if needed
    };

    const generateReport = () => {
        AdminService.generateComplianceReport()
            .then(() => {
                fetchAllComplianceReports(); // Update the list after generating the report
            })
            .catch(error => {
                console.error('Error generating compliance report:', error);
            });
    };

    return (
        <div className='container'>
            <h2 className='text-center'>Compliance Reports</h2>
            <button className="btn btn-primary mb-2" onClick={generateReport}>Generate Report</button>
            <table className="table table-bordered table-info r table-striped">
                <thead>
                    <tr className='table-warning'>
                        <th>ID</th>
                        <th>Total Leaves Taken</th>
                        <th>Total Tax</th>
                        <th>Annual Salary</th>
                        <th>Year</th>
        
                        
                    </tr>
                </thead>
                <tbody>
                    {complianceReports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.reportId}</td>
                            <td>{report.totalLeavesTaken}</td>
                            <td>{report.taxReport}</td>
                            <td>{report.annualSalary}</td>
                            <td>{report.year}</td>
                            
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComplianceReportList;
