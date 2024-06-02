import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PayrollProcessorService from '../Services/PayrollProcessorService';

const PayrollProcessor = ({ handleCalculatePayroll, handleVerifyPayroll, handleProcessPayments }) => {
  const [message, setMessage] = useState('');

  return (
    <div className='container'>
      <Link to='#' className='btn btn-primary mr-2' onClick={handleCalculatePayroll}>
        Calculate Payroll
      </Link>
      <Link to='#' className='btn btn-primary mr-2' onClick={handleVerifyPayroll}>
        Verify Payroll
      </Link>
      <Link to='#' className='btn btn-primary' onClick={handleProcessPayments}>
        Process Payments
      </Link>
      {message && <p className='mt-3'>{message}</p>}
    </div>
  );
};

export default PayrollProcessor;
