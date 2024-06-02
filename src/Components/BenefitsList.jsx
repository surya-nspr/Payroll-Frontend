import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PayrollProcessorService from '../Services/PayrollProcessorService';

const BenefitsList = () => {
  const [benefitsArray, setBenefitsArray] = useState([]);

  useEffect(() => {
    fetchAllBenefits();
  }, []);

  const fetchAllBenefits = () => {
    PayrollProcessorService.getAllBenefits()
      .then(response => {
        setBenefitsArray(response.data);
      })
      .catch(error => {
        console.error('Error fetching time sheets:', error);
      });
  };


  return (
    <div className='container'>
      <h2 className='text-center'>Benefits Data</h2>
      
      <table className='table table-bordered table-info r table-striped'>
        <thead>
          <tr className='table-warning'>
            <th>Benefit Id</th>
            <th>Benefit Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Coverage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {benefitsArray && benefitsArray.map((benefits, index) => (
            <tr key={index}>
              <td>{benefits.benefitId}</td>
              <td>{benefits.benefitName}</td>
              <td>{benefits.description}</td>
              <td>{benefits.amount}</td>
              <td>{benefits.coverage}</td>
              <td>
                <Link to={`/payroll-processor/updateBenefits/${benefits.benefitId}`} className='btn btn-success'>Update</Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BenefitsList;
