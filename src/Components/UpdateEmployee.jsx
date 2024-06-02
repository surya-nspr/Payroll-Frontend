import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMale, faCalendarAlt, faDollarSign, faPhone, faMapMarkerAlt, faCity, faGlobe, faIdCard, faBuilding, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import EmployeeService from '../Services/EmployeeService';
import { useSelector } from 'react-redux'; 

const UpdateEmployee = () => {
    const [employeeData, setEmployeeData] = useState(null);
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
    const storedEmployeeId = useSelector(state => state.auth.employeeId);

    const handleSubmit = () => {
        if (storedEmployeeId) {
            EmployeeService.getEmployeeById(storedEmployeeId)
                .then((response) => {
                    setEmployeeData(response.data);
                    const { firstName, lastName, emailId, gender, dateOfBirth, position, salary, phoneNumber, address } = response.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmailId(emailId);
                    setGender(gender);
                    setDateOfBirth(dateOfBirth);
                    setPosition(position);
                    setSalary(salary);
                    setPhoneNumber(phoneNumber);
                    if (address) {
                        setId(address.id);
                        setStreetAddress(address.streetAddress);
                        setCity(address.city);
                        setState(address.state);
                        setCountry(address.country);
                        setPostalCode(address.postalCode);
                    }
                    if (response.data.department) {
                        setDepartmentId(response.data.department.departmentId);
                    }
                    if (response.data.manager) {
                        setManagerId(response.data.manager.managerId);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching employee details:', error);
                });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const address = { id, streetAddress, city, state, country, postalCode };
        const department = { departmentId };
        const manager = { managerId };
        const employee = { employeeId: storedEmployeeId, firstName, lastName, emailId, gender, dateOfBirth, position, salary, phoneNumber, address, department, manager };
        console.log("Employee to be updated:", employee);
        if (storedEmployeeId) {
            EmployeeService.manageEmployeeInformation(storedEmployeeId, employee, ['firstName', 'lastName', 'emailId', 'gender', 'dateOfBirth', 'position', 'salary', 'phoneNumber', 'address', 'departmentId', 'managerId'])
                .then(() => {
                    console.log('Employee updated successfully');
                    navigate('/employee');
                })
                .catch((error) => {
                    console.error('Error updating employee:', error);
                });
        } else {
            console.error('Error employeeId not found:', error);
            navigate('/employee');
        }
    };

    useEffect(() => {
        handleSubmit();
    }, [storedEmployeeId]);

    return (
        <div className='blur-background'>
            <div className='employee-form-container'>
                <h2 className='text-center'>Update Employee</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        {employeeData && (
                            <form onSubmit={handleUpdate}>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faUser} /> First Name:
                                    </label>
                                    <p>{firstName}</p>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faUser} /> Last Name:
                                    </label>
                                    <p>{lastName}</p>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faEnvelope} /> Email:
                                    </label>
                                    <p>{emailId}</p>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faMale} /> Gender:
                                    </label>
                                    <p>{gender}</p>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faIdCard} /> Position:
                                    </label>
                                    <p>{position}</p>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faDollarSign} /> Salary:
                                    </label>
                                    <p>{salary}</p>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faIdCard} /> Department ID:
                                    </label>
                                    <p>{departmentId}</p>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faIdCard} /> Manager ID:
                                    </label>
                                    <p>{managerId}</p>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className='col-md-6'>
                        {employeeData && (
                            <form onSubmit={handleUpdate}>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth:
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faPhone} /> Phone Number:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control small-input'
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Street Address:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control small-input'
                                        value={streetAddress}
                                        onChange={(e) => setStreetAddress(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faCity} /> City:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control small-input'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faGlobe} /> State:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control small-input'
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faBuilding} /> Country:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control small-input'
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <FontAwesomeIcon icon={faSave} /> Postal Code:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control small-input'
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className='btn btn-success'>
                                    Update Employee
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                <Link to='/employee' className='btn btn-secondary'>
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                </Link>
            </div>
        </div>
    );
};

export default UpdateEmployee;
