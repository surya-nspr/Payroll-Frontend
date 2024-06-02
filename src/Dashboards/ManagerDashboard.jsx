import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ManagerService from '../Services/ManagerService';
import ManagerPayrollRecords from '../Components/ManagerPayrollRecords';

const ManagerDashboard = () => {
  const [managerProfile, setManagerProfile] = useState(null);
  const [approvedLeavesCount, setApprovedLeavesCount] = useState(0);
  const [rejectedLeavesCount, setRejectedLeavesCount] = useState(0);
  const [pendingLeavesCount, setPendingLeavesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showReviewPayrolls, setShowReviewPayrolls] = useState(false);
  const [error, setError] = useState(null);
  const managerId = 1;

  useEffect(() => {
    fetchManagerProfile();
    fetchLeavesCounts();
  }, []);

  const fetchManagerProfile = () => {
    ManagerService.getManagerById(managerId)
      .then((response) => {
        console.log('Manager Profile Data Response:', response);
        setManagerProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching manager profile data:', error);
        setError('Error fetching manager profile data');
        setLoading(false);
      });
  };

  const fetchLeavesCounts = () => {
    ManagerService.getLeaveRequestsByManagerId(managerId)
      .then((response) => {
        const leaveRequests = response.data; // Assuming leave requests are directly under response.data

        if (!Array.isArray(leaveRequests)) {
          throw new Error('Leave requests data is missing or not an array.');
        }

        let approvedCount = 0;
        let rejectedCount = 0;
        let pendingCount = 0;

        leaveRequests.forEach((request) => {
          // Assuming status is an enum with values 'APPROVED', 'REJECTED', 'PENDING'
          switch (request.status) {
            case 'APPROVED':
              approvedCount++;
              break;
            case 'REJECTED':
              rejectedCount++;
              break;
            case 'PENDING':
              pendingCount++;
              break;
            default:
              break;
          }
        });

        setApprovedLeavesCount(approvedCount);
        setRejectedLeavesCount(rejectedCount);
        setPendingLeavesCount(pendingCount);
      })
      .catch((error) => {
        console.error('Error fetching leaves counts:', error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Define colors based on counts
  const approvedColor = 'green';
  const rejectedColor = 'red';
  const pendingColor = 'yellow';

  return (
    <div>
    <header className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between w-100">
            <h2 className="mb-0">Manager Dashboard</h2>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <Link to="/manager/review-payrolls" className="btn btn-secondary">
                  Review Team Payrolls
                </Link>
              </div>
              <div className="me-3">
                <Link to="/manager/leaverequests" className="btn btn-secondary">
                  Approve/Reject Leave Requests
                </Link>
              </div>
              <div className="me-3">
                <Link to="/manager/profile" className="btn btn-secondary">
                  View Manager Profile
                </Link>
              </div>
              <DropdownButton
                id="dropdown-basic-button"
                title={<FontAwesomeIcon icon={faUser} className="me-2" />}
                variant="secondary"
              >
                <Dropdown.Item><Link to="/manager/review-payrolls"><FontAwesomeIcon icon={faTasks} className="me-2" /> View Payroll Records</Link></Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-4 mb-3">
            {/* Approved Leaves Card */}
            <div className={`card ${approvedLeavesCount > 0 ? 'bg-success' : 'bg-transparent'}`}>
              <div className="card-body text-center">
                <h3 className="card-title">Approved Leaves</h3>
                <h3 className="card-text">{approvedLeavesCount}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            {/* Rejected Leaves Card */}
            <div className={`card ${rejectedLeavesCount > 0 ? 'bg-danger' : 'bg-transparent'}`}>
              <div className="card-body text-center">
                <h3 className="card-title">Rejected Leaves</h3>
                <h3 className="card-text">{rejectedLeavesCount}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            {/* Pending Leaves Card */}
            <div className={`card ${pendingLeavesCount > 0 ? 'bg-warning' : 'bg-transparent'}`}>
              <div className="card-body text-center">
                <h3 className="card-title">Pending Leaves</h3>
                <h3 className="card-text">{pendingLeavesCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-6 mb-3">
            {/* Manager Profile Card */}
            <div className="card bg-transparent">
              <div className="card-body text-center">
                <h3 className="card-title">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                  Manager Profile
                </h3>
                {managerProfile && (
                  <div>
                    <p>Name: {managerProfile.firstName}</p>
                    <p>Email: {managerProfile.emailId}</p>
                    <p>Position: {managerProfile.position}</p>
                    <p>Salary: {managerProfile.salary}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            {/* Payroll Records Card */}
            <div className="card bg-transparent">
              <div className="card-body text-center">
                <h3 className="card-title">
                  <FontAwesomeIcon icon={faTasks} className="me-2" />
                  Payroll Records
                </h3>
                <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                  {showReviewPayrolls &&  <ManagerPayrollRecords />}
                  </div>
                  <button className="btn btn-secondary mt-3" onClick={() => setShowReviewPayrolls(!showReviewPayrolls)}>
                    {showReviewPayrolls ? 'Hide Payroll Records' : 'Show Payroll Records'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ManagerDashboard;
  
