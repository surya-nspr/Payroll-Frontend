import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ManagerService from '../Services/ManagerService'
const ListManagers = () => {
    const [managerArray, setManagerArray] = useState([])
    const navigate = useNavigate()
    const fetchAllManagers = () => {
        console.log('Fetch all Managers Fired...')
        ManagerService.getAllManagers().then((response) => {
          setManagerArray(response.data)
          console.log('Response received from API', response.data)
          
        })
    }
    
  
    useEffect(() => {
        fetchAllManagers()
      }, [])

      
  return (
    <div className='container'>
    {console.log('Application has rendered....')}
      <h2 className='text-center'>Managers Data</h2>
      
      <table className='table table-bordered table-info r table-striped'>
        <thead>
        <tr className='table-warning'>
          <th>ManagerId</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>EmailId</th>
          <th>Position</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            managerArray.map((manager, key) => <tr key={key}>
              <td>{manager.managerId}</td>
              <td>{manager.firstName}</td>
              <td>{manager.lastName}</td>
              <td>{manager.emailId}</td>
              <td>{manager.position}</td>
              <td><Link to={`/admin/manager/${manager.managerId}`} className='btn btn-success'>Update</Link></td>
              
            </tr>)
          }
        </tbody>
      </table>
      </div>
  )
}

export default ListManagers
