import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PayrollProcessorService from '../Services/PayrollProcessorService'
const ListPayrollProcessors = () => {
    const [processorArray, setProcessorArray] = useState([])
    const navigate = useNavigate()
    const fetchAllProcessors = () => {
        console.log('Fetch all Processors Fired...')
        PayrollProcessorService.getAllProcesssors().then((response) => {
          setProcessorArray(response.data)
          console.log('Response received from API', response.data)
        })
    }
    useEffect(() => {
        fetchAllProcessors()
      }, [])
  return (
    <div className='container'>
    {console.log('Application has rendered....')}
      <h2 className='text-center'>Payroll Processors Data</h2>
     
      <table className='table table-bordered table-info r table-striped'>
        <thead>
        <tr className='table-warning'>
          <th>ProcessorId</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>EmailId</th>
          <th>Phone Number</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            processorArray.map((processor, key) => <tr key={key}>
              <td>{processor.processorId}</td>
              <td>{processor.firstName}</td>
              <td>{processor.lastName}</td>
              <td>{processor.emailId}</td>
              <td>{processor.phoneNumber}</td>
              <td><Link to={`/admin/payrollprocessor/${processor.processorId}`} className='btn btn-success'>Update</Link></td>
              
            </tr>)
          }
        </tbody>
      </table>
      </div>
  )
}

export default ListPayrollProcessors
