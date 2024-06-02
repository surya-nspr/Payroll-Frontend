import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setEmployeeId, setManagerId, setPayrollProcessorId } from '../Store/authSlice';
import UserService from '../Services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import UserServices from '../Services/UserServices';
import './styles.css'

// Import the AuthService

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateUsername = (username) => {
    // Regex pattern for username validation
    const usernamePattern = /^[a-zA-Z0-9]{8,10}$/;
    return usernamePattern.test(username);
  };

  const validatePassword = (password) => {
    // Regex pattern for password validation
    const passwordPattern = /^.{8,16}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    if (!validateUsername(username)) {
      setError('Username must be 8 to 10 characters long and contain only alphabets and numbers.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be 8 to 16 characters long.');
      return;
    }

    try {
      const response = await UserService.login(username, password);
      console.log('Login Response:', response); // Log the entire response data
      const { accessToken, userDto } = response.data;
      dispatch(setToken(accessToken));
      localStorage.setItem('authToken', accessToken);

      UserService.setAuthHeader(accessToken);

      const userEmail = userDto.email || ''; // Provide a default value if userDto.email is null or undefined

      if (userDto && userDto.userRole && userDto.userRole.id) {
        const roleId = userDto.userRole.id;
        console.log('Role ID:', roleId);

        switch (roleId) {
          case 1: // Assuming roleId is numeric, change as per your actual roleId type
            navigate('/admin');
            break;
          case 2: // Example for other roles, modify as per your actual roleId values
            handleEmployeeLogin(userEmail);
            break;
          case 3: // Example for other roles, modify as per your actual roleId values
            handleManagerLogin(userEmail);
            break;
          case 4: // Example for other roles, modify as per your actual roleId values
            handlePayrollProcessorLogin(userEmail);
            break;
          // Add cases for other roles here
          default:
            navigate('/');
        }
      } else {
        console.error('UserDto or userRole is missing:', userDto);
        // Handle missing userDto or userRole
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Invalid username or password.'); // Handle login error (display error message to the user)
    }
  };

  const handleEmployeeLogin = async (userEmail) => {
    try {
      const employeeIdResponse = await UserServices.getEmployeeIdByEmail(userEmail);
      const employeeId = employeeIdResponse.data;
      dispatch(setEmployeeId(employeeId));
      localStorage.setItem('employeeId', employeeId);
      navigate('/employee');
    } catch (error) {
      console.error('Error fetching employee ID:', error);
      setError('Error fetching employee ID.');
    }
  };

  const handleManagerLogin = async (userEmail) => {
    try {
      const managerIdResponse = await UserServices.getManagerIdByEmail(userEmail);
      const managerId = managerIdResponse.data;
      dispatch(setManagerId(managerId));
      localStorage.setItem('managerId', managerId);
      navigate('/manager');
    } catch (error) {
      console.error('Error fetching manager ID:', error);
      setError('Error fetching manager ID.');
    }
  };

  const handlePayrollProcessorLogin = async (userEmail) => {
    try {
      const payrollProcessorIdResponse = await UserServices.getPayrollProcessorIdByEmail(userEmail);
      const payrollProcessorId = payrollProcessorIdResponse.data;
      dispatch(setPayrollProcessorId(payrollProcessorId));
      localStorage.setItem('payrollProcessorId', payrollProcessorId);
      navigate('/payroll');
    } catch (error) {
      console.error('Error fetching payroll processor ID:', error);
      setError('Error fetching payroll processor ID.');
    }
  };

  const isFormValid = username.trim() !== '' && password.trim() !== ''; // Check if username and password are not empty

  return (
    <div className="login-container">
      <div className="card bg-transparent card-custom">
        <div className="card-body">
          <h2 className="card-title text-center mb-4" style={{ color: 'black' }}>Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {username.trim() === '' && <div className="text-danger">Username is required.</div>}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {password.trim() === '' && <div className="text-danger">Password is required.</div>}
            </div>
            <button type="submit" className={`btn btn-primary ${!isFormValid ? 'disabled' : ''}`} disabled={!isFormValid}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
