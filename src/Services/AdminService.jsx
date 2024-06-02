import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:8080/api/admin/'
class AdminService {

  addEmployee (employee) {
    const url = BASE_REST_API_URL + 'employee'
    console.log('Adding event at URL:', url)
    return axios.post(url, employee)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  manageEmployeeInformation(employeeId, employee, fieldsToUpdate) {
    const url = `${BASE_REST_API_URL}employees/${employeeId}`;
    console.log('Managing employee information at URL:', url);
    return axios.put(url, employee, { params: { fieldsToUpdate: fieldsToUpdate.join(',') } });
  }

  generateComplianceReport() {
    const url = BASE_REST_API_URL + 'compliancereport';
    console.log('Generating compliance report at URL:', url);
    return axios.get(url);
  }

  getAllComplianceReports() {
    const url = `${BASE_REST_API_URL}compliancereports/all`;
    console.log('Fetching all compliance reports at URL:', url);
    return axios.get(url);
  }

  getAllAuditTrails() {
    const url = `${BASE_REST_API_URL}audittrails/all`;
    console.log('Fetching all audit logs at URL:', url);
    return axios.get(url);
  }

  addPayrollPolicy(payrollPolicy) {
    const url = `${BASE_REST_API_URL}payroll-policy`;
    console.log('Adding payroll policy at URL:', url);
    return axios.post(url, payrollPolicy);
  }

  updatePayrollPolicy(policyId, payrollPolicy) {
    const url = `${BASE_REST_API_URL}payrollPolicies/${policyId}`;
    console.log('Updating payroll policy at URL:', url);
    return axios.put(url, payrollPolicy);
  }

  addManager (manager) {
    const url = BASE_REST_API_URL + 'manager'
    console.log('Adding manager at URL:', url)
    return axios.post(url, manager)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  updateManager(managerId, manager, fieldsToUpdate) {
    const url = `${BASE_REST_API_URL}managers/${managerId}`;
    console.log('Managing Manager information at URL:', url);
    return axios.put(url, manager, { params: { fieldsToUpdate: fieldsToUpdate.join(',') } });
  }

  addDepartment (department) {
    const url = BASE_REST_API_URL + 'department'
    console.log('Adding department at URL:', url)
    return axios.post(url, department)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  updateDepartment (departmentId,department) {
    const url = BASE_REST_API_URL + 'department/' +departmentId
    console.log('Adding event at URL:', url)
    return axios.put(url, department)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  addProcessor (processor) {
    const url = BASE_REST_API_URL + 'payrollprocessor'
    console.log('Adding processor at URL:', url)
    return axios.post(url, processor)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  updateProcessor (processorId,processor, fieldsToUpdate) {
    const url = BASE_REST_API_URL + 'payrollprocessor/' +processorId
    console.log('Updating Processor at URL:', url)
    return axios.put(url, processor,{ params: { fieldsToUpdate: fieldsToUpdate.join(',') } })
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  addUser (user) {
    const url = BASE_REST_API_URL + 'adduser'
    console.log('Adding User at URL:', url)
    return axios.post(url, user)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  updateUser (userId,user) {
    const url = BASE_REST_API_URL + 'users/' +userId
    console.log('Adding event at URL:', url)
    return axios.put(url, user)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

}
export default new AdminService()