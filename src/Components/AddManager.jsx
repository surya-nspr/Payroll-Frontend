import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AdminService from '../Services/AdminService';
import ManagerService from '../Services/ManagerService';
import './styles.css';

const AddManager = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { managerId } = useParams();

    useEffect(() => {
        if (managerId) {
            ManagerService.getManagerById(managerId)
                .then((response) => {
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
                        setStreetAddress(address.streetAddress);
                        setCity(address.city);
                        setState(address.state);
                        setCountry(address.country);
                        setPostalCode(address.postalCode);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching manager details:', error);
                });
        }
    }, [managerId]);

    const saveOrUpdateManager = (e) => {
        e.preventDefault();
        const errors = {};
        if (!firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!emailId.trim()) {
            errors.emailId = 'Email is required';
        }
        if (!gender) {
            errors.gender = 'Gender is required';
        }
        if (!dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
        }
        if (!position.trim()) {
            errors.position = 'Position is required';
        }
        if (!salary) {
            errors.salary = 'Salary is required';
        }
        if (!phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        }
        if (!streetAddress.trim()) {
            errors.streetAddress = 'Street address is required';
        }
        if (!city.trim()) {
            errors.city = 'City is required';
        }
        if (!state.trim()) {
            errors.state = 'State is required';
        }
        if (!country.trim()) {
            errors.country = 'Country is required';
        }
        if (!postalCode.trim()) {
            errors.postalCode = 'Postal code is required';
        }

        if (Object.keys(errors).length === 0) {
            const address = { streetAddress, city, state, country, postalCode };
            const manager = { managerId: managerId, firstName, lastName, emailId, gender, dateOfBirth, position, salary, phoneNumber, address: address };
            if (managerId) {
                AdminService.updateManager(managerId, manager, ['firstName', 'lastName', 'emailId', 'gender', 'dateOfBirth', 'position', 'salary', 'phoneNumber', 'address'])
                    .then(() => {
                        console.log('Manager updated successfully');
                        navigate('/admin');
                    })
                    .catch((error) => {
                        console.error('Error updating Manager:', error);
                    });
            } else {
                AdminService.addManager(manager)
                    .then(() => {
                        console.log('Manager added successfully');
                        navigate('/admin');
                    })
                    .catch((error) => {
                        console.error('Error adding manager:', error);
                    });
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className='blur-background'>
            <div className='manager-form-container'>
                {managerId ? <h2 className='text-center'>Update Manager</h2> : <h2 className='text-center'>Add Manager</h2>}
                <form>
                    <div className='form-group'>
                        <label>First Name:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <span className='error'>{errors.firstName}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Last Name:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <span className='error'>{errors.lastName}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input
                            type='email'
                            className='form-control'
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        {errors.emailId && <span className='error'>{errors.emailId}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Gender:</label>
                        <select
                            className='form-control'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value=''>Select Gender</option>
                            <option value='MALE'>Male</option>
                            <option value='FEMALE'>Female</option>
                            <option value='OTHER'>Other</option>
                        </select>
                        {errors.gender && <span className='error'>{errors.gender}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Date of Birth:</label>
                        <input type='date' className='dateOfBirth' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                        {errors.dateOfBirth && <span className='error'>{errors.dateOfBirth}</span>}
                    </div>
                    <div className='form-group'>
                    <label>Position:</label>
                    <select
                        className='form-control'
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    >
                        <option value=''>Select Position</option>
                        <option value='Manager'>Manager</option>
                        <option value='Supervisor'>Supervisor</option>
                        <option value='Asst Manager'>Asst Manager</option>
                        {/* Add more options as needed */}
                    </select>
                    {errors.position && <span className='error'>{errors.position}</span>}
                </div>
                    <div className='form-group'>
                        <label>Salary:</label>
                        <input
                            type='number'
                            className='form-control'
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                        {errors.salary && <span className='error'>{errors.salary}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Phone Number:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && <span className='error'>{errors.phoneNumber}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Street:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={streetAddress || ''}
                            onChange={(e) => setStreetAddress(e.target.value)}
                        />
                        {errors.streetAddress && <span className='error'>{errors.streetAddress}</span>}
                    </div>
                    <div className='form-group'>
                        <label>City:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {errors.city && <span className='error'>{errors.city}</span>}
                    </div>
                    <div className='form-group'>
                        <label>State:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        {errors.state && <span className='error'>{errors.state}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Country:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        {errors.country && <span className='error'>{errors.country}</span>}
                    </div>
                    <div className='form-group'>
                        <label>Postal Code:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        {errors.postalCode && <span className='error'>{errors.postalCode}</span>}
                    </div>
                    <button onClick={(e) => saveOrUpdateManager(e)} className='btn btn-success'>
                        Save Manager
                    </button>
                    <Link to='/admin' className='btn btn-secondary'>
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default AddManager;