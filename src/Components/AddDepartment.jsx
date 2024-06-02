import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import AdminService from '../Services/AdminService';
import DepartmentService from '../Services/DepartmentService';
import './styles.css';

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { departmentId } = useParams();

    useEffect(() => {
        if (departmentId) {
            DepartmentService.getDepartmentById(departmentId)
                .then((response) => {
                    const { departmentName } = response.data;
                    setDepartmentName(departmentName);
                })
                .catch((error) => {
                    console.error('Error fetching Department details:', error);
                });
        }
    }, [departmentId]);

    const saveOrUpdateDepartment = (e) => {
        e.preventDefault();
        // Validation check
        if (!departmentName.trim()) {
            setError('All fields are required');
            return; // Stop further execution if validation fails
        }
        
        const department = { departmentId: departmentId, departmentName };
        if (departmentId) {
            AdminService.updateDepartment(departmentId, department)
                .then(() => {
                    console.log('Department updated successfully');
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error updating Department:', error);
                });
        } else {
            AdminService.addDepartment(department)
                .then(() => {
                    console.log('Department added successfully');
                    navigate('/admin');
                })
                .catch((error) => {
                    console.error('Error adding department:', error);
                });
        }
    };

    const isFormValid = departmentName.trim() !== ''; // Check if department name is not empty

    return (
        <div className='blur-background'>
            <div className='department-form-container'>
                <h2 className='text-center'>{departmentId ? 'Update Department' : 'Add Department'}</h2>
                <form>
                    <div className='form-group'>
                        <label>Department Name:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                        />
                        {!isFormValid && (
                            <div className="error-message">
                                <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                                All fields are required
                            </div>
                        )}
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button
                        onClick={saveOrUpdateDepartment}
                        className={`btn btn-success ${!isFormValid && 'disabled'}`}
                        disabled={!isFormValid}
                    >
                        Save Department
                    </button>
                    <Link to='/admin' className='btn btn-secondary'>Cancel</Link>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
