import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';
import AdminService from '../Services/AdminService';
import PayrollProcessorService from '../Services/PayrollProcessorService';
import './styles.css';

const AddPayrollProcessor = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { processorId } = useParams();

    useEffect(() => {
        if (processorId) {
            PayrollProcessorService.getProcessorById(processorId)
                .then((response) => {
                    const { firstName, lastName, emailId, phoneNumber } = response.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmailId(emailId);
                    setPhoneNumber(phoneNumber);
                })
                .catch((error) => {
                    console.error('Error fetching PayrollProcessor details:', error);
                });
        }
    }, [processorId]);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'firstName':
                if (!value.trim()) {
                    setFirstNameError('First name is required');
                } else {
                    setFirstNameError('');
                }
                break;
            case 'lastName':
                if (!value.trim()) {
                    setLastNameError('Last name is required');
                } else {
                    setLastNameError('');
                }
                break;
            case 'emailId':
                if (!value.trim()) {
                    setEmailError('Email is required');
                } else {
                    setEmailError('');
                }
                break;
            case 'phoneNumber':
                if (!value.trim()) {
                    setPhoneNumberError('Phone number is required');
                } else {
                    setPhoneNumberError('');
                }
                break;
            default:
                break;
        }
    };

    const saveOrUpdatePayrollProcessor = (e) => {
        e.preventDefault();

        validateField('firstName', firstName);
        validateField('lastName', lastName);
        validateField('emailId', emailId);
        validateField('phoneNumber', phoneNumber);

        if (firstNameError || lastNameError || emailError || phoneNumberError) {
            setError('Please fill in all required fields');
            return;
        }

        const processor = { processorId: processorId, firstName, lastName, emailId, phoneNumber };

        if (processorId) {
            AdminService.updateProcessor(processorId, processor, [
                'firstName',
                'lastName',
                'emailId',
                'gender',
                'dateOfBirth',
                'position',
                'salary',
                'phoneNumber',
                'address',
                'department',
                'manager',
            ])
                .then(() => {
                    console.log('Processor updated successfully');
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error updating Payroll Processor:', error);
                });
        } else {
            AdminService.addProcessor(processor)
                .then(() => {
                    console.log('Payroll Processor added successfully');
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error adding Processor:', error);
                });
        }
    };

    return (
        <div className="blur-background">
            <div className="processor-form-container">
                {processorId ? (
                    <h2 className="text-center">Update Payroll Processor</h2>
                ) : (
                    <h2 className="text-center">Add Payroll Processor</h2>
                )}
                <form>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                validateField('firstName', e.target.value);
                            }}
                        />
                        {firstNameError && <p className="text-danger">{firstNameError}</p>}
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                validateField('lastName', e.target.value);
                            }}
                        />
                        {lastNameError && <p className="text-danger">{lastNameError}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={emailId}
                            onChange={(e) => {
                                setEmailId(e.target.value);
                                validateField('emailId', e.target.value);
                            }}
                        />
                        {emailError && <p className="text-danger">{emailError}</p>}
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                validateField('phoneNumber', e.target.value);
                            }}
                        />
                        {phoneNumberError && <p className="text-danger">{phoneNumberError}</p>}
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button onClick={(e) => saveOrUpdatePayrollProcessor(e)} className="btn btn-success">
                        Save Payroll Processor
                    </button>
                    <Link to="/admin" className="btn btn-secondary">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default AddPayrollProcessor;