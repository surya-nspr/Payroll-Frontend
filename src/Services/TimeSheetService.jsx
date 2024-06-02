import axios from 'axios';

const BASE_REST_API_URL = 'http://localhost:8080/api/timesheets/'; // Update the base URL accordingly

class TimeSheetService  {
  getAllTimeSheets() {
    const url = BASE_REST_API_URL + 'all'
    console.log('Adding event at URL:', url)
    return axios.get(url)
  }

  getTimeSheetById(timeSheetId) {
    const url = BASE_REST_API_URL  + timeSheetId;
    console.log('Adding event at URL:', url)
    return axios.get(url)
  }

  getTotalHoursWorked(employeeId) {
    const url = BASE_REST_API_URL  + employeeId + '/totalHoursWorked';
    console.log('Adding event at URL:', url)
    return axios.get(url)
  }
}

export default new  TimeSheetService();
