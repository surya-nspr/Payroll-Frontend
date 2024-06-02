import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserServices from '../Services/UserServices'
const ListUsers = () => {
    const [userArray, setUserArray] = useState([])
    const fetchAllUsers = () => {
        console.log('Fetch all Users Fired...')
        UserServices.getAllUSers().then((response) => {
          setUserArray(response.data)
          console.log('Response received from API', response.data)
        })
    }
    useEffect(() => {
        fetchAllUsers()
      }, [])
  return (
    <div className='container'>
    {console.log('Application has rendered....')}
      <h2 className='text-center'>User Data</h2>
     
      <table className='table table-bordered table-info r table-striped'>
        <thead>
        <tr className='table-warning'>
          <th>User Id</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Role Id</th>
          <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {
            userArray.map((user, key) => <tr key={key}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.userRole.id}</td>
              
              <td><Link to={`/admin/update/user/${user.userId}`} className='btn btn-success'>Update</Link></td>
            </tr>)
          }
        </tbody>
      </table>
      </div>
  )
}

export default ListUsers
