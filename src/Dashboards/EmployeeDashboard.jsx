import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClock, faTasks, faUser, faUserEdit, faFileAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import TimeSheetService from '../Services/TimeSheetService';
import EmployeeService from '../Services/EmployeeService';
import EmployeeProfile from '../Components/EmployeeProfile';
import PayrollRecords from '../Components/PayrollRecords'; // Import PayrollRecords component
import { useSelector } from 'react-redux'; // Import useSelector hook

const EmployeeDashboard = () => {
    const [totalLeaves, setTotalLeaves] = useState(null);
    const [hoursWorked, setHoursWorked] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employeeProfile, setEmployeeProfile] = useState(null);
    const storedEmployeeId = useSelector(state => state.auth.employeeId); // Fetch employee ID from Redux store

    useEffect(() => {
        fetchEmployeeData();
        fetchTotalHoursData();
        fetchEmployeeProfile();
    }, []);

    const fetchEmployeeData = () => {
        EmployeeService.getTotalLeavesById(storedEmployeeId)
            .then((response) => {
                console.log('Employee Data Response:', response);
                setTotalLeaves(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
                setError('Error fetching employee data');
                setLoading(false);
            });
    };

    const fetchTotalHoursData = () => {
        TimeSheetService.getTotalHoursWorked(storedEmployeeId)
            .then((response) => {
                console.log('Total Hours Data Response:', response);
                setHoursWorked(response.data);
            })
            .catch((error) => {
                console.error('Error fetching total hours data:', error);
                setError('Error fetching total hours data');
            });
    };

    const fetchEmployeeProfile = () => {
        EmployeeService.getEmployeeById(storedEmployeeId)
            .then((response) => {
                console.log('Employee Profile Data Response:', response);
                setEmployeeProfile(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee profile data:', error);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <header className="navbar navbar-expand-lg navbar-light bg-transparent"> {/* Change bg-light to bg-transparent */}
                <div className="container-fluid">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <h2 className="mb-0">Employee Dashboard</h2>
                        <div className="d-flex align-items-center">
                            <div className="me-3">
                                <Link to="/employee/submittimesheet" className="btn btn-secondary">
                                    <FontAwesomeIcon icon={faClock} className="me-2" /> Time Sheet
                                </Link>
                            </div>
                            <div className="me-3">
                                <Link to="/employee/submit-leave-request" className="btn btn-secondary">
                                    <FontAwesomeIcon icon={faTasks} className="me-2" /> Leave Request
                                </Link>
                            </div>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={<FontAwesomeIcon icon={faUser} className="me-2" />}
                                variant="secondary"
                            >
                                <Dropdown.Item><Link to="/employee/update"><FontAwesomeIcon icon={faUserEdit} className="me-2" /> Update Employee</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/employee/payroll-records"><FontAwesomeIcon icon={faFileAlt} className="me-2" /> View Payroll Records</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/employee/time-sheets"><FontAwesomeIcon icon={faTasks} className="me-2" /> TimeSheets</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/employee/leaves"><FontAwesomeIcon icon={faTasks} className="me-2" /> Leaves List</Link></Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="card bg-transparent"> {/* Change card class to bg-transparent */}
                            <div className="card-body text-center">
                                <h3 className="card-title">Total Leaves</h3>
                                <h3 className="card-text">{totalLeaves}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <div className="card bg-transparent"> {/* Change card class to bg-transparent */}
                            <div className="card-body text-center">
                                <h3 className="card-title">Hours Worked</h3>
                                <h3 className="card-text">{hoursWorked}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card bg-transparent"> {/* Change card class to bg-transparent */}
                            <div className="card-body text-center">
                                <h3 className="card-title">
                                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                                    Employee Profile
                                </h3>
                                {employeeProfile && (
                                    <EmployeeProfile
                                        name={employeeProfile.firstName}
                                        email={employeeProfile.emailId}
                                        salary={employeeProfile.salary}
                                        position={employeeProfile.position}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card bg-transparent"> {/* Change card class to bg-transparent */}
                            <div className="card-body text-center">
                                <h3 className="card-title">
                                    Payroll Records
                                </h3>
                                <div style={{ height: '400px', overflowY: 'auto' }}> {/* Set height and overflow */}
                                    <PayrollRecords employeeId={storedEmployeeId} /> {/* Use storedEmployeeId */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
