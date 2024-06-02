import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmployeeService from '../Services/EmployeeService'
const ListEmployees = () => {
    const [employeeArray, setEmployeeArray] = useState([])
    const navigate = useNavigate()
    const fetchAllEmployees = () => {
        console.log('Fetch all Employees Fired...')
        EmployeeService.getAllEmployees().then((response) => {
          setEmployeeArray(response.data)
          console.log('Response received from API', response.data)
        })
    }
    const deleteEmployee = (employeeId) => {
        console.log('Delete employee Fired...');
        EmployeeService.deleteEmployee(employeeId)
            .then(() => {
                console.log('Employee deleted successfully');
                fetchAllEmployees();
            })
            .catch((error) => {
                console.error('Error deleting employee:', error);
            })
    }


    useEffect(() => {
        fetchAllEmployees()
      }, [])
  return (
    <div className='container'>
    {console.log('Application has rendered....')}
      <h2 className='text-center'>Employee Data</h2>
     
      <table className='table table-bordered table-info r table-striped'>
        <thead>
        <tr className='table-warning'>
          <th>EmployeeId</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>EmailId</th>
          <th>Position</th>
          <th>Update</th>
          <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            employeeArray.map((employee, key) => <tr key={key}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.emailId}</td>
              <td>{employee.position}</td>
              <td><Link to={`/update/${employee.employeeId}`} className='btn btn-success'>Update</Link></td>
              
              <td><button className='btn btn-danger' onClick={() => deleteEmployee(employee.employeeId)}>Delete</button></td>
            </tr>)
          }
        </tbody>
      </table>
      </div>
  )
}

export default ListEmployees
