import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMale, faCalendarAlt, faDollarSign, faPhone, faMapMarkerAlt, faCity, faGlobe, faIdCard, faBuilding, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import EmployeeService from '../Services/EmployeeService';
import AdminService from '../Services/AdminService';
import './styles.css';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [id, setId] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [managerId, setManagerId] = useState('');
  const navigate = useNavigate();
  const { employeeId } = useParams();

  useEffect(() => {
    if (employeeId) {
      EmployeeService.getEmployeeById(employeeId)
        .then((response) => {
          const { firstName, lastName, emailId, gender, dateOfBirth, position, salary, phoneNumber, address, department, manager } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setEmailId(emailId);
          setGender(gender);
          setDateOfBirth(dateOfBirth);
          setPosition(position);
          setSalary(salary);
          setPhoneNumber(phoneNumber);
          setId(address.id);
          setStreetAddress(address.streetAddress);
          setCity(address.city);
          setState(address.state);
          setCountry(address.country);
          setPostalCode(address.postalCode);
          setDepartmentId(department.departmentId);
          setManagerId(manager.managerId);
        })
        .catch((error) => {
          console.error('Error fetching employee details:', error);
        });
    }
  }, [employeeId]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const address = { id, streetAddress, city, state, country, postalCode };
    const department = { departmentId };
    const manager = { managerId };
    const employee = { employeeId: employeeId, firstName, lastName, emailId, gender, dateOfBirth, position, salary, phoneNumber, address: address, department: department, manager: manager };

    if (employeeId) {
      AdminService.manageEmployeeInformation(employeeId, employee, ['firstName', 'lastName', 'emailId', 'gender', 'dateOfBirth', 'position', 'salary', 'phoneNumber', 'address', 'department', 'manager'])
        .then(() => {
          console.log('Employee updated successfully');
          navigate('/admin');
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
        });
    } else {
      AdminService.addEmployee(employee)
        .then(() => {
          console.log('Employee added successfully');
          navigate('/admin');
        })
        .catch((error) => {
          console.error('Error adding employee:', error);
        });
    }
  };

  return (
    <div className='blur-background'>
    <div className='employee-form-container'>
      <h2 className='text-center'>{employeeId ? 'Update Employee' : 'Add Employee'}</h2>
      <form>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='firstName'>
                <FontAwesomeIcon icon={faUser} /> First Name:
              </label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>
                <FontAwesomeIcon icon={faUser} /> Last Name:
              </label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>
                <FontAwesomeIcon icon={faEnvelope} /> Email:
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='gender'>
                <FontAwesomeIcon icon={faMale} /> Gender:
              </label>
              <select
                className='form-control'
                id='gender'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=''>Select Gender</option>
                <option value='MALE'>Male</option>
                <option value='FEMALE'>Female</option>
                <option value='OTHER'>Other</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='dob'>
                <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth:
              </label>
              <input
                type='date'
                className='form-control'
                id='dob'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className='form-group'>
  <label htmlFor='position'>
    <FontAwesomeIcon icon={faIdCard} /> Position:
  </label>
  <select
    className='form-control'
    id='position'
    value={position}
    onChange={(e) => setPosition(e.target.value)}
  >
    <option value=''>Select Position</option>
    <option value='Tester'>
      <FontAwesomeIcon icon={faIdCard} /> Tester
    </option>
    <option value='Manager'>
      <FontAwesomeIcon icon={faIdCard} /> Manager
    </option>
    <option value='Developer'>
      <FontAwesomeIcon icon={faIdCard} /> Developer
    </option>
    <option value='Designer'>
      <FontAwesomeIcon icon={faIdCard} /> Designer
    </option>
    {/* Add more options as needed */}
  </select>
</div>

            <div className='form-group'>
              <label htmlFor='salary'>
                <FontAwesomeIcon icon={faDollarSign} /> Salary:
              </label>
              <input
                type='number'
                className='form-control'
                id='salary'
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>
                <FontAwesomeIcon icon={faPhone} /> Phone Number:
              </label>
              <input
                type='text'
                className='form-control'
                id='phone'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='street'>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Street:
              </label>
              <input
                type='text'
                className='form-control'
                id='street'
                value={streetAddress || ''}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='city'>
                <FontAwesomeIcon icon={faCity} /> City:
              </label>
              <input
                type='text'
                className='form-control'
                id='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='state'>
                <FontAwesomeIcon icon={faIdCard} /> State:
              </label>
              <input
                type='text'
                className='form-control'
                id='state'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='country'>
                <FontAwesomeIcon icon={faGlobe} /> Country:
              </label>
              <input
                type='text'
                className='form-control'
                id='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='postalCode'>
                <FontAwesomeIcon icon={faBuilding} /> Postal Code:
              </label>
              <input
                type='text'
                className='form-control'
                id='postalCode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='departmentId'>
                <FontAwesomeIcon icon={faIdCard} /> Department ID:
              </label>
              <input
                type='text'
                className='form-control'
                id='departmentId'
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='managerId'>
                <FontAwesomeIcon icon={faIdCard} /> Manager ID:
              </label>
              <input
                type='text'
                className='form-control'
                id='managerId'
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-md-12'>
            <button onClick={(e) => saveOrUpdateEmployee(e)} className='btn btn-success'>
              <FontAwesomeIcon icon={faSave} /> Save Employee
            </button>
            <Link to='/admin' className='btn btn-secondary'>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </Link>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddEmployee;