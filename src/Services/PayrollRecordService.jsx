import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:8080/api/payrollrecords/'
class PayrollRecordService {
  getAllRecords () { // return axios.get(BASE_REST_API_URL + 'eventsList')
    const url = BASE_REST_API_URL + 'all'
    console.log('Fetching records from:', url) // Logging the complete URL
    return axios.get(url)
  }
}
export default new  PayrollRecordService();