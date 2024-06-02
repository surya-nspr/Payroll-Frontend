import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListEmployees from './Components/ListEmployees'
import AddEmployee from './Components/AddEmployee'
import AdminDashboard from './Dashboards/AdminDashboard'
import EmployeeDashboard from './Dashboards/EmployeeDashboard'
import ManagerDashboard from './Dashboards/ManagerDashboard'
import PayrollProcessorDashboard from './Dashboards/PayrollProcessorDashboard'
import UpdateEmployee from './Components/UpdateEmployee'
import ComplianceReport from './Components/ComplianceReport'
import AuditTrailList from './Components/AuditTrails'
import { PayrollPolicy } from './Components/PayrollPolicy'
import PayrollPoliciesList from './Components/PayrollPoliciesList'

import SubmitLeaveRequest from './Components/SubmitLeaveRequest'
import PayrollRecords from './Components/PayrollRecords'
import TimeSheetsByEmployee from './Components/TimeSheetsByEmployee'
import PayrollProcessor from './Components/PayrollProcessor'
import Manager from './Components/Manager'
import ManagerPayrollRecords from './Components/ManagerPayrollRecords'
import TimeSheets from './Components/TimeSheets'
import Benefits from './Components/Benefits'
import BenefitsList from './Components/BenefitsList'
import ProcessorPayrollRecords from './Components/ProcessorPaayrollRecords'
import ManagerProfile from './Components/ManagerProfile'
import AddManager from './Components/AddManager'
import AddDepartment from './Components/AddDepartment'
import AddPayrollProcessor from './Components/AddPayrollProcessor'
import ListDepartments from './Components/ListDepartments'
import ListManagers from './Components/ListManagers'
import ListPayrollProcessors from './Components/ListPayrollProcessors'
import Login from './Components/Login'
import Headers from './Components/Headers'
import AddUser from './Components/AddUser'
import ListUsers from './Components/ListUsers'
import Footer from './Components/Footer'
import EmployeesLeavesList from './Components/EmployeeLeavesList'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Headers />

        <div className='container'>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/admin' element={<AdminDashboard/>}/>
            <Route path="/employee" element={<EmployeeDashboard />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/payroll" element={<PayrollProcessorDashboard />}/>
            <Route path='/employee/list' element={<ListEmployees/>}/>

            <Route path='/admin/add-employee' element={<AddEmployee/>}/>
            <Route path='/update/:employeeId' element={<AddEmployee/>}/>
            <Route path="/admin/update-employee" element={<ListEmployees />} />
            <Route path="/admin/compliance-report" element={<ComplianceReport/>} />
            <Route path="/admin/audit-trails" element={<AuditTrailList/>} />
            <Route path="/admin/add-payroll-policy" element={<PayrollPolicy/>} />
            <Route path="/admin/payroll-policies" element={<PayrollPoliciesList />} />
            <Route path="/admin/update-payroll-policy/:policyId" element={<PayrollPolicy/>} />
            <Route path='/admin/add-users' element={<AddUser/>}/>
            <Route path='/admin/users' element={<ListUsers/>}/>
            <Route path='/admin/update/user/:userId' element={<AddUser/>}/>
            <Route path="/employee/update" element={<UpdateEmployee />} />
            <Route path="/employee/submittimesheet" element={<TimeSheets/>} />
            <Route path="/employee/submit-leave-request" element={<SubmitLeaveRequest/>} />
            <Route path="/employee/submit-leave-request/:employeeId" element={<SubmitLeaveRequest/>} />
            <Route path="/employee/payroll-records" element={<PayrollRecords/>} />
            <Route path="/employee/time-sheets" element={<TimeSheetsByEmployee/>} />
            <Route path="/employee/leaves" element={<EmployeesLeavesList/>} />
            <Route path="/employee/updateTimeSheet/:timeSheetId" element={<TimeSheets/>} />
            <Route path="/payroll-processor" element={<PayrollProcessor/>} />
            <Route path="/payroll-processor/calculate" element={<PayrollProcessor/>}/>
            <Route path="/payroll-processor/verify" element={<PayrollProcessor/>}/>
            <Route path="/payroll-processor/process-payments" element={<PayrollProcessor/>}/>
            <Route path="/manager/:managerId" element={<Manager />} />
            <Route path="/manager/leaverequests/:managerId" element={<Manager />} />
            <Route path="/manager/leaverequests/approve/:requestId" element={<Manager />} />
            <Route path="/manager/review-payrolls" element={<ManagerPayrollRecords />} />
            <Route path="/payroll-processor/addbenefits" element={<Benefits/>} />
            <Route path="/payroll-processor/benefits" element={<BenefitsList/>} />
            <Route path="/payroll-processor/updatebenefits/:benefitId" element={<Benefits/>} />
            <Route path="/payroll-processor/PayrollRecords" element={<ProcessorPayrollRecords/>} />
            <Route path="/manager/profile" element={<ManagerProfile />} />
            <Route path="/manager/profile/:managerId" element={<ManagerProfile />} />
            <Route path="/admin/add-manager" element={<AddManager />} />
            <Route path="/admin/manager/:managerId" element={<AddManager />} />
            <Route path="/admin/manager" element={<ListManagers />} />
            <Route path="/admin/department" element={<ListDepartments />} />
            <Route path="/admin/add-department" element={<AddDepartment />} />
            <Route path="/admin/update/department/:departmentId" element={<AddDepartment />} />
            <Route path="/admin/add-payrollprocessor" element={<AddPayrollProcessor />} />
            <Route path="/admin/payrollprocessor" element={<ListPayrollProcessors />} />
            <Route path="/admin/payrollprocessor/:processorId" element={<AddPayrollProcessor />} />
          </Routes>
        </div>
       <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
