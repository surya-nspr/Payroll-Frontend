import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserServices from '../Services/UserServices';
import AdminService from '../Services/AdminService';
import './styles.css';

const AddUser = () => {
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userRole, setUserRole] = useState({ id: 1 });
    const [userRoleError, setUserRoleError] = useState('');
    const [formError, setFormError] = useState('');

    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        if (userId) {
            UserServices.getUserById(userId)
                .then((response) => {
                    const { username, email, password, userRole } = response.data;
                    setUserName(username);
                    setEmail(email);
                    setPassword(password);
                    setUserRole(userRole);
                })
                .catch((error) => {
                    console.error('Error fetching User details:', error);
                });
        }
    }, [userId]);

    const validateInputs = () => {
        let isValid = true;
        if (!userName) {
            setUserNameError('Username is required');
            isValid = false;
        } else {
            setUserNameError('');
        }
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }
        if (!userRole.id) {
            setUserRoleError('User Role ID is required');
            isValid = false;
        } else {
            setUserRoleError('');
        }
        return isValid;
    };

    const saveOrUpdateUser = (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            setFormError('Please fill in all the required fields');
            return;
        }

        const user = {
            userId: userId,
            username: userName,
            email: email,
            password: password,
            userRole: userRole,
        };

        if (userId) {
            AdminService.updateUser(userId, user)
                .then(() => {
                    console.log('User updated successfully');
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error updating User:', error);
                });
        } else {
            AdminService.addUser(user)
                .then(() => {
                    console.log('User added successfully');
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error adding User:', error);
                });
        }
    };

    const isSaveButtonDisabled = !userName || !email || !password || !userRole.id;

    return (
        <div>
            <div className='blur-background'>
                <div className='user-form-container'>
                    <h2 className='text-center'>{userId ? 'Update User' : 'Add User'}</h2>
                    <form>
                    <div className='form-group'>
                        <label>User Name:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <div className='error'>{userNameError}</div>
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input
                            type='email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='error'>{emailError}</div>
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input
                            type='password'
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='error'>{passwordError}</div>
                    </div>
                    <div className='form-group'>
                        <label>User Role ID:</label>
                        <input
                            type='number'
                            className='form-control'
                            value={userRole.id}
                            onChange={(e) => setUserRole({ id: e.target.value })}
                        />
                        <div className='error'>{userRoleError}</div>
                    </div>
                    <div className='error'>{formError}</div>
                        <button
                            onClick={(e) => saveOrUpdateUser(e)}
                            className='btn btn-success'
                            disabled={isSaveButtonDisabled} // Disable button if any required field is empty
                        >
                            {userId ? 'Update User' : 'Add User'}
                        </button>
                        <Link to='/admin' className='btn btn-secondary'>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
