import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminService from '../Services/AdminService'

const  AuditTrails= () => {
  const [logArray, setLogArray] = useState([])
  const navigate = useNavigate()
  // const [status, setstatus] = false
  const fetchAuditTrails = () => {
    console.log('Fetch all Logs Fired...')
   AdminService.getAllAuditTrails().then((response) => {
      setLogArray(response.data)
      console.log('Response received from API', response.data)
    })
  }
  useEffect(() => {
    fetchAuditTrails()
  }, [])
  return (
    <div className='container'>
    {console.log('Application has rendered....')}
      <h2 className='text-center'>AuditTrails Data</h2>
      <table className="table table-bordered table-info r table-striped">
        <thead>
        <tr className='table-warning'>
            <th>ID</th>
            <th>Activity</th>
            <th>User Role</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {
            logArray.map((data, key) => <tr key={key}>
              <td>{data.logId}</td>
              <td>{data.activity}</td>
              <td>{data.userRole.id}</td> 
              <td>{data.timestamp}</td>
            </tr>)
          }
        </tbody>
      </table>
      </div>
  )
}

export default AuditTrails
