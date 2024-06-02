import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faUserCircle, faDollarSign, faMoneyBillAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import PayrollProcessorService from '../Services/PayrollProcessorService';
import PayrollRecordService from "../Services/PayrollRecordService";
import AuditTrails from '../Components/AuditTrails';
import ProcessorPaayrollRecords from '../Components/ProcessorPaayrollRecords'; // Import the component

const PayrollProcessorDashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const processorId = useSelector(state => state.auth.payrollProcessorId);
  console.log('Processor ID:', processorId);
  
  const fetchPayrollsCount = () => {
    PayrollProcessorService.getPayrollRecordsByProcessorId(processorId)
      .then((response) => {
        const payrollRecords = response.data;
  
        if (!Array.isArray(payrollRecords)) {
          throw new Error('Payroll Records data is missing or not an array.');
        }
  
        let pendingCount = 0;
        let verifiedCount = 0;
        let paidCount = 0;
  
        payrollRecords.forEach((record) => {
          switch (record.status) {
            case 'PENDING':
              pendingCount++;
              break;
            case 'VERIFIED':
              verifiedCount++;
              break;
            case 'PAID':
              paidCount++;
              break;
            default:
              break;
          }
        });
  
        setPendingCount(pendingCount);
        setVerifiedCount(verifiedCount);
        setPaidCount(paidCount);
      })
      .catch((error) => {
        console.error('Error fetching payroll counts:', error);
        console.log('Response data:', error.response ? error.response.data : null); // Log response data if available
      });
  };
  
  const handleCalculatePayroll = () => {
    PayrollProcessorService.calculatePayroll()
      .then(response => {
        alert('Payroll calculation successful');
      })
      .catch(error => {
        alert('Error calculating payroll');
      });
  };

  const handleVerifyPayroll = () => {
    PayrollProcessorService.verifyPayrollData()
      .then(response => {
        alert('Payroll verification successful');
      })
      .catch(error => {
        alert('Error verifying payroll');
      });
  };

  const handleProcessPayments = () => {
    PayrollProcessorService.processPayments()
      .then(response => {
        alert('Payroll Payments successful');
      })
      .catch(error => {
        alert('Error Paying payroll');
      });
  };

  useEffect(() => {
    fetchPayrollsCount();
  }, [pendingCount, verifiedCount, paidCount]);

  return (
    <div>
    <header className="navbar navbar-expand-lg navbar-light bg-transparent mb-4">
        <div className="container-fluid">
          <h2 className="mb-0" style={{ fontSize: '2rem', marginRight: 'auto', marginBottom: '0', flexGrow: '1' }}>Payroll Processor Dashboard</h2>
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <button className="btn btn-primary me-3 btn-sm" onClick={handleCalculatePayroll}>
                <FontAwesomeIcon icon={faMoneyBillAlt} className="me-2" />
                Calculate Payroll
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-success me-3 btn-sm" onClick={handleVerifyPayroll}>
                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                Verify Payroll Data
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-info me-3 btn-sm" onClick={handleProcessPayments}>
                <FontAwesomeIcon icon={faDollarSign} className="me-2" />
                Process Payments
              </button>
            </li>
            <li className="nav-item">
              <Link to="/payroll-processor/addbenefits" className="btn btn-secondary me-3">
                <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                Add Benefits
              </Link>
            </li>
            <li className="nav-item dropdown">
              <DropdownButton id="dropdown-basic-button" title={<FontAwesomeIcon icon={faTasks} className="me-2" />} variant="secondary">
                <Dropdown.Item>
                  <Link to="/payroll-processor/benefits">
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                    Benefits
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/payroll-processor/PayrollRecords">
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                    Payroll Records List
                  </Link>
                </Dropdown.Item>
              </DropdownButton>
            </li>
          </ul>
        </div>
      </header>
      
      <div className="container-fluid mb-4">
        <div className="row justify-content-center">
          <div className="col-sm-3 col-6 mb-4">
            <div className="card text-white bg-danger p-3">
              <div className="card-content">
                <span className="card-title font-weight-bold">Pending</span>
                <p className="card-text display-4 text-right">{pendingCount}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-6 mb-4">
            <div className="card text-white bg-warning p-3">
              <div className="card-content">
                <span className="card-title font-weight-bold">Verified</span>
                <p className="card-text display-4 text-right">{verifiedCount}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-6 mb-4">
            <div className="card text-white bg-success p-3">
              <div className="card-content">
                <span className="card-title font-weight-bold">Paid</span>
                <p className="card-text display-4 text-right">{paidCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-between">
        <div className="card" style={{ width: '48%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <div className="card-header">
            <h3 className="card-title">Audit Trails</h3>
          </div>
          <div className="card-body" style={{ maxHeight: '25vh', overflowY: 'auto', backgroundColor: 'transparent' }}>
            <AuditTrails />
          </div>
        </div>

        {/* Corrected component name */}
        <div className="card" style={{ width: '48%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <div className="card-header">
            <h3 className="card-title">Payroll Records List</h3>
          </div>
          <div className="card-body" style={{ maxHeight: '25vh', overflowY: 'auto', backgroundColor: 'transparent' }}>
            <ProcessorPaayrollRecords />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollProcessorDashboard;
