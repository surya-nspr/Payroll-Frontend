import axios from 'axios';

const BASE_REST_API_URL = 'http://localhost:8080/api/users/';

class UserServices {
    getAllUSers () { // return axios.get(BASE_REST_API_URL + 'eventsList')
        const url = BASE_REST_API_URL + 'all'
        console.log('Fetching Users from:', url) // Logging the complete URL
        return axios.get(url)
      }
      getUserById (userId) {
        const url = BASE_REST_API_URL + 'get/' + userId
        console.log('Fetching Users at URL:', url)
        return axios.get(url)
      }

      getEmployeeIdByEmail(userEmail) {
        const url = BASE_REST_API_URL + 'email?userEmail=' + userEmail;
        console.log('Fetching Employee ID at URL:', url);
        return axios.get(url);
      }

      getManagerIdByEmail(userEmail) {
        const url = BASE_REST_API_URL + 'manager/' + userEmail;
        console.log('Fetching Manager ID by Email at URL:', url);
        return axios.get(url);
      }
    
      getPayrollProcessorIdByEmail(userEmail) {
        const url = BASE_REST_API_URL + 'payroll-processor/' + userEmail;
        console.log('Fetching Payroll Processor ID by Email at URL:', url);
        return axios.get(url);
      }
    
}

export default new UserServices();
