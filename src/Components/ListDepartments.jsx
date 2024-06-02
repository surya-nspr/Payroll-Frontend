import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DepartmentService from '../Services/DepartmentService'
const ListDepartments = () => {
    const [departmentArray, setDepartmentArray] = useState([])
    const navigate = useNavigate()
    const fetchAllDepartments = () => {
        console.log('Fetch all Departments Fired...')
        DepartmentService.getAllDepartments().then((response) => {
          setDepartmentArray(response.data)
          console.log('Response received from API', response.data)
        })
    }

    useEffect(() => {
        fetchAllDepartments()
      }, [])
  return (
    <div className='container'>
    {console.log('Application has rendered....')}
      <h2 className='text-center'>Departments Data</h2>
     
      <table className='table table-bordered table-info r table-striped'>
        <thead>
        <tr className='table-warning'>
          <th>DepartmentId</th>
          <th>DepartmentName</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            departmentArray.map((department, key) => <tr key={key}>
              <td>{department.departmentId}</td>
              <td>{department.departmentName}</td>
              <td><Link to={`/admin/update/department/${department.departmentId}`} className='btn btn-success'>Update</Link></td>
              
            </tr>)
          }
        </tbody>
      </table>
      </div>
  )
}

export default ListDepartments
