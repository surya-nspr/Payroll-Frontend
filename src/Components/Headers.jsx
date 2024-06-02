import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for navigation
import logo from '../logo.png'; // Adjust the import path for your logo image
import { useDispatch } from 'react-redux';
import { clearToken } from '../Store/authSlice'; // Import clearToken action
import { useNavigate } from 'react-router-dom';

const Headers = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth token from Redux store and local storage
    dispatch(clearToken());
    localStorage.removeItem('authToken');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('managerId');
    localStorage.removeItem('payrollProcessorId');

    // Redirect to the login page
    window.location.href = '/'; // Redirect using window.location
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step in the history
  };

  const showLogoutButton = location.pathname !== '/'; // Hide logout button on login page

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          Payroll Management
        </Link>
        <div>
        {location.pathname !== '/' && (
          <button className='btn btn-primary' onClick={handleGoBack}>
            Back
          </button>
        )}
        {showLogoutButton && (
          <button className="btn btn-outline-danger me-2" onClick={handleLogout}>
            Logout
          </button>
        )}
        
      </div>
      </div>
    </header>
  );
};

export default Headers;
