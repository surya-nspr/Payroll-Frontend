import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:8080/api/payroll-policies/'
class PayrollPolicyService {

    getAllPayrollPolicies() {
        const url = `${BASE_REST_API_URL}all`;
        console.log('Fetching all policies at URL:', url);
        return axios.get(url);
    }

    getPayrollPolicyById (policyId) {
        const url = BASE_REST_API_URL + policyId
        console.log('Adding event at URL:', url)
        return axios.get(url)
      }

}
export default new PayrollPolicyService()