import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/managers/'; // Update with your Spring Boot server URL

class ManagerService {
  getLeaveRequestsByManagerId(managerId) {
    const url = `${BASE_URL}leaverequests/${managerId}`;
    console.log('Fetching leave requests at URL:', url);
    return axios.get(url);
  }

  getManagerById(managerId) {
    const url = `${BASE_URL}${managerId}`;
    console.log('Fetching Manager Details at URL:', url);
    return axios.get(url);
  }

  reviewTeamPayrolls(managerId) {
    const url = `${BASE_URL}${managerId}/payrolls`;
    console.log('Fetching team payrolls at URL:', url);
    return axios.get(url);
  }

  approveLeaveRequest(requestId) {
    const url = `${BASE_URL}leaveRequests/approve`;
    console.log('Approving leave request at URL:', url);
    return axios.post(url, {requestId });
  }

  rejectLeaveRequest(requestId, reason) {
    const url = `${BASE_URL}reject`;
    console.log('Rejecting leave request at URL:', url);
    return axios.post(url, { requestId, reason });
  }

  getAllManagers () { // return axios.get(BASE_REST_API_URL + 'eventsList')
    const url = BASE_URL + 'all'
    console.log('Fetching Managers from:', url) // Logging the complete URL
    return axios.get(url)
  }

}

export default new ManagerService();
