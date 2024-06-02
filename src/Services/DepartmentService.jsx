import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:8080/api/departments/'
class DepartmentService {
  getAllDepartments () { // return axios.get(BASE_REST_API_URL + 'eventsList')
    const url = BASE_REST_API_URL + 'list'
    console.log('Fetching Departments from:', url) // Logging the complete URL
    return axios.get(url)
  }

  getDepartmentById (departmentId) {
    const url = BASE_REST_API_URL + 'get/' + departmentId
    console.log('Adding event at URL:', url)
    return axios.get(url)
  }
}
export default  new DepartmentService()