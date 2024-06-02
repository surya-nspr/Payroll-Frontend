import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PayrollPolicyService from '../Services/PayrollPolicyService'

const PayrollPoliciesList = () => {
  const [policiesArray, setPoliciesArray] = useState([])
  const navigate = useNavigate()
  // const [status, setstatus] = false
  const fetchAllPayrollPolicies = () => {
    console.log('Fetch all Policies Fired...')
    PayrollPolicyService.getAllPayrollPolicies().then((response) => {
      setPoliciesArray(response.data)
      console.log('Response received from API', response.data)
    })
  }
  useEffect(() => {
    fetchAllPayrollPolicies()
  }, [])
  return (
    <div className='container'>
    {console.log('Application has rendered....')}
      <h2 className='text-center'>Policies Data</h2>
      <table className="table table-bordered table-info r table-striped">
        <thead>
        <tr className='table-warning'>
          <th>policy Id</th>
          <th>Policy Name</th>
          <th>Description</th>
          <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {
            policiesArray.map((data, key) => <tr key={key}>
              <td>{data.policyId}</td>
              <td>{data.policyName}</td>
              <td>{data.description}</td>
              <td><Link to={`/admin/update-payroll-policy/${data.policyId}`} className='btn btn-success'>Update</Link></td>
              
            </tr>)
          }
        </tbody>
      </table>
      </div>
  )
}

export default PayrollPoliciesList
