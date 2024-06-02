import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:8080/api/payrollprocessor/'
class PayrollProcessorService {
    calculatePayroll () {
        const url = BASE_REST_API_URL + 'calculate'
        console.log('Calculating Payments at URL:', url)
        return axios.get(url)
      }

      verifyPayrollData () {
        const url = BASE_REST_API_URL + 'verify' 
        console.log('Verifying Payments at URL:', url)
        return axios.get(url)
      }

      processPayments () {
        const url = BASE_REST_API_URL + 'process-payments'
        console.log('Paying Payrolls at URL:', url)
        return axios.get(url)
      }

      addBenefits (benefits) {
        const url = BASE_REST_API_URL + 'benefits'
        console.log('Adding Benefit at URL:', url)
        return axios.post(url, benefits)
      }

      updateBenefits (benefitsId,benefits) {
        const url = BASE_REST_API_URL + 'benefits/' + benefitsId
        console.log('Updating Benefits at URL:', url)
        return axios.put(url,benefits)
      }

      getAllBenefits () {
        const url = BASE_REST_API_URL + 'benefits'
        console.log('Benefits List at URL:', url)
        return axios.get(url)
      }

      getBenefitsById (benefitId) {
        const url = BASE_REST_API_URL + 'benefits/' + benefitId
        console.log('Benefits at URL:', url)
        return axios.get(url)
      }

      getPayrollRecordsByProcessorId (processorId) {
        const url = BASE_REST_API_URL + 'payrollrecords/' + processorId
        console.log('Benefits at URL:', url)
        return axios.get(url)
      }

      getAllProcesssors () {
        const url = BASE_REST_API_URL + 'all'
        console.log('Processors List at URL:', url)
        return axios.get(url)
      }

      getProcessorById(processorId) {
        const url = BASE_REST_API_URL +'get/'+processorId;
        console.log('Fetching Processor Details at URL:', url);
        return axios.get(url);
      }

      getAllAuditTrails() {
        const url = `${BASE_REST_API_URL}audittrails/all`;
        console.log('Fetching all audit logs at URL:', url);
        return axios.get(url);
      }

}
export default new PayrollProcessorService()