import React, { useEffect, useState } from 'react';
import PayrollPolicyService from '../Services/PayrollPolicyService';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AdminService from '../Services/AdminService';
import './styles.css'

export const PayrollPolicy = () => {
  const [policyName, setPolicyName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { policyId } = useParams();

  useEffect(() => {
    if (policyId) {
      PayrollPolicyService.getPayrollPolicyById(policyId)
        .then(response => {
          setPolicyName(response.data.policyName);
          setDescription(response.data.description);
        })
        .catch(error => console.log('Error: ', error));
    }
  }, [policyId]);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!policyName.trim()) {
      errors.policyName = 'Policy Name is required';
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const saveOrUpdatePayrollPolicy = e => {
    e.preventDefault();

    if (validateForm()) {
      const payrollPolicy = { policyId, policyName, description };
      if (policyId) {
        AdminService.updatePayrollPolicy(policyId, payrollPolicy)
          .then(response => {
            console.log('Response received from update API: ', response.data);
            navigate('/admin/payroll-policies');
          })
          .catch(error => console.log('Error: ', error));
      } else {
        AdminService.addPayrollPolicy(payrollPolicy)
          .then(response => {
            console.log('Response received from add API: ', response.data);
            navigate('/admin');
          })
          .catch(error => console.log('Error: ', error));
      }
    }
  };
  

  return (
    <div>
      <div className='blur-background'>
        <div className='policies-form-container'>
          <h2 className='text-center'>{policyId ? 'Update Payroll Policy' : 'Add Payroll Policy'}</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Policy Name</label>
                <input
                  type='text'
                  placeholder='Enter Policy Name'
                  name='policyName'
                  value={policyName}
                  className='form-control'
                  onChange={e => setPolicyName(e.target.value)}
                />
                {errors.policyName && <div className="text-danger">{errors.policyName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Description</label>
                <textarea
                  placeholder='Enter Policy Description'
                  name='description'
                  value={description}
                  className='form-control'
                  onChange={e => setDescription(e.target.value)}
                />
                {errors.description && <div className="text-danger">{errors.description}</div>}
              </div>

              <button onClick={e => saveOrUpdatePayrollPolicy(e)} className='btn btn-success'>
                {policyId ? 'Update Policy' : 'Add Policy'}
              </button>
              <Link to="/admin" className='btn btn-danger'>Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};