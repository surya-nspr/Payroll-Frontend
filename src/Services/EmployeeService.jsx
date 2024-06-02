import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:8080/api/employees/'
class EmployeeService {
  getAllEmployees () { // return axios.get(BASE_REST_API_URL + 'eventsList')
    const url = BASE_REST_API_URL + 'all'
    console.log('Fetching employees from:', url) // Logging the complete URL
    return axios.get(url)
  }
  getEmployeeById (employeeId) {
    const url = BASE_REST_API_URL + 'getemployee/' + employeeId
    console.log('Adding event at URL:', url)
    return axios.get(url)
  }

  /*addEvent (event) {
    const url = BASE_REST_API_URL + 'create'
    console.log('Adding event at URL:', url)
    return axios.post(url, event)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  getEventById (id) {
    const url = BASE_REST_API_URL + 'get/' + id
    console.log('Adding event at URL:', url)
    return axios.get(url)
  }

  updateEvent (id, event) {
    const url = BASE_REST_API_URL + 'update/' + id
    console.log('Adding event at URL:', url)
    return axios.put(url, event)
  }
  */
  deleteEmployee (employeeId, employee) {
    const url = BASE_REST_API_URL + 'delete/' + employeeId
    console.log('Adding event at URL:', url)
    return axios.delete(url, employee)
  }

  updateTimeSheet(timeSheetId, TimeSheet){
    const url = BASE_REST_API_URL + 'time-sheets/' + timeSheetId
    console.log('Updating TimeSheet at URL:', url)
    return axios.put(url, TimeSheet)
    }

    submitTimeSheet(timeSheet){
      const url = BASE_REST_API_URL + 'time-sheet/'+timeSheet.employeeId
      console.log('Submit TimeSheet at URL:', url)
      return axios.post(url, timeSheet)
      }

      submitLeaveRequest(leave){
        const url = BASE_REST_API_URL +leave.employeeId + '/leave-request'
        console.log('Submit Leave at URL:', url)
        return axios.post(url, leave)
        }

        getPayrollRecordsById (employeeId) {
          const url = BASE_REST_API_URL + 'payrollrecords/' + employeeId
          console.log('Adding event at URL:', url)
          return axios.get(url)
        }

        getTimeSheetsById (employeeId) {
          const url = BASE_REST_API_URL + employeeId + '/time-sheets'
          console.log('Adding event at URL:', url)
          return axios.get(url)
        }

        getTotalLeavesById (employeeId) {
          const url = BASE_REST_API_URL  + employeeId + '/total-leaves'
          console.log('Adding event at URL:', url)
          return axios.get(url)
        }

        getLeavesById (employeeId) {
          const url = BASE_REST_API_URL + employeeId + '/leaves'
          console.log('Adding event at URL:', url)
          return axios.get(url)
        }
        
        manageEmployeeInformation(employeeId, employee, fieldsToUpdate) {
          const url = `${BASE_REST_API_URL}employees/${employeeId}`;
          console.log('Managing employee information at URL:', url);
          return axios.put(url, employee, { params: { fieldsToUpdate: fieldsToUpdate.join(',') } });
        }
}
export default new EmployeeService()
