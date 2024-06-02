import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TimeSheetService from '../Services/TimeSheetService';
import EmployeeService from '../Services/EmployeeService';
import { useSelector } from 'react-redux';
import './styles.css';

const TimeSheets = () => {
    const [hoursWorked, setHoursWorked] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [overTime, setOverTime] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({
        hoursWorked: '',
        startDate: '',
        endDate: '',
        overTime: '',
        status: ''
    });

    const navigate = useNavigate();
    const { timeSheetId } = useParams();
    const storedEmployeeId = useSelector(state => state.auth.employeeId);

    useEffect(() => {
        if (timeSheetId) {
            // Fetch time sheet details if in update mode
            TimeSheetService.getTimeSheetById(timeSheetId)
                .then((response) => {
                    console.log('Time sheet details:', response.data);
                    // Set state with time sheet details
                    setHoursWorked(response.data.hoursWorked);
                    setStartDate(response.data.startDate);
                    setEndDate(response.data.endDate);
                    setOverTime(response.data.overTime);
                    setStatus(response.data.status);
                })
                .catch((error) => {
                    console.error('Error fetching time sheet details:', error);
                });
        }
    }, [timeSheetId]);

    const validateFields = () => {
        let isValid = true;
        const newErrors = {
            hoursWorked: '',
            startDate: '',
            endDate: '',
            overTime: '',
            status: ''
        };

        if (!hoursWorked) {
            newErrors.hoursWorked = 'Hours Worked is required';
            isValid = false;
        }

        if (!startDate) {
            newErrors.startDate = 'Start Date is required';
            isValid = false;
        }

        if (!endDate) {
            newErrors.endDate = 'End Date is required';
            isValid = false;
        }

        if (!overTime) {
            newErrors.overTime = 'Overtime is required';
            isValid = false;
        }

        if (!status) {
            newErrors.status = 'Status is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const saveOrUpdateTimeSheet = (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        const timeSheet = {
            employeeId: storedEmployeeId,
            hoursWorked,
            startDate,
            endDate,
            overTime,
            status
        };
    
        if (timeSheetId) {
            // Update existing time sheet
            EmployeeService.updateTimeSheet(timeSheetId, timeSheet)
                .then(() => {
                    console.log('Time sheet updated successfully');
                    navigate('/employee');
                })
                .catch((error) => {
                    console.error('Error updating time sheet:', error);
                });
        } else {
            // Submit new time sheet
            EmployeeService.submitTimeSheet(timeSheet)
                .then(() => {
                    console.log('Time sheet submitted successfully');
                    navigate('/employee');
                })
                .catch((error) => {
                    console.error('Error submitting time sheet:', error);
                });
        }
    };
    

    return (
        <div className='blur-background'>
            <div className='timesheet-form-container'>
                <h2 className="text-center">{timeSheetId ? 'Update Time Sheet' : 'Submit Time Sheet'}</h2>
                <form>
                    <div className="form-group">
                        <label>Employee ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={storedEmployeeId}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Hours Worked:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={hoursWorked}
                            onChange={(e) => setHoursWorked(e.target.value)}
                        />
                        {errors.hoursWorked && <p className="text-danger">{errors.hoursWorked}</p>}
                    </div>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
                    </div>
                    <div className="form-group">
                        <label>Overtime:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={overTime}
                            onChange={(e) => setOverTime(e.target.value)}
                        />
                        {errors.overTime && <p className="text-danger">{errors.overTime}</p>}
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        {errors.status && <p className="text-danger">{errors.status}</p>}
                    </div>
                    <button onClick={(e) => saveOrUpdateTimeSheet(e)} className="btn btn-success">
                        {timeSheetId ? 'Update Time Sheet' : 'Submit Time Sheet'}
                    </button>
                    <Link to="/employee" className="btn btn-secondary">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default TimeSheets;