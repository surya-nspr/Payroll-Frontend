import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faUserPlus, faEdit, faChartBar, faAddressBook, faTasks, faBookOpen, faFileAlt, faUserCog, faBell, faBuilding, faUsers, faMoneyCheckAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AuditTrails from '../Components/AuditTrails';
import PayrollPoliciesList from '../Components/PayrollPoliciesList'; // Import PoliciesList component
import ManagerService from '../Services/ManagerService';
import UserServices from '../Services/UserServices';
import DepartmentService from '../Services/DepartmentService';
import Chart from 'chart.js/auto'; // Import Chart.js

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import EmployeeService from '../Services/EmployeeService';


const AdminDashboard = () => {
  const [managerCount, setManagerCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const chartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchManagerCount();
    fetchDepartmentCount();
    fetchEmployeeCount();
    fetchUserCount();
  }, []);

  const fetchManagerCount = () => {
    ManagerService.getAllManagers().then((response) => {
      setManagerCount(response.data.length);
    });
  };

  const fetchDepartmentCount = () => {
    DepartmentService.getAllDepartments().then((response) => {
      setDepartmentCount(response.data.length);
    });
  };
  
  const fetchUserCount = () => {
    UserServices.getAllUSers().then((response) => {
      setUserCount(response.data.length);
    });
  };

  const fetchEmployeeCount = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        const employees = response.data;
        const currentMonth = new Date().getMonth() + 1; // Current month
        const monthlyCounts = new Array(12).fill(0); // Initialize array to store counts for each month
        
        employees.forEach((employee) => {
          const joiningMonth = new Date(employee.dateOfJoining).getMonth() + 1; // Extract month from joining date
          for (let month = joiningMonth - 1; month < currentMonth; month++) {
            monthlyCounts[month]++; // Increment count for each month from joining month until current month
          }
        });
  
        setEmployeeCount(monthlyCounts);
      })
      .catch((error) => {
        console.error('Error fetching employee count:', error);
      });
  };

  useEffect(() => {
    const ctx = chartRef.current;
    if (ctx) {
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Sample months data
          datasets: [{
            label: 'Monthly Employee Count',
            data: employeeCount,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1 // Set the step size to 1 for y-axis
            }
          }
        }
      });
    }
  }, [employeeCount]);


  return (
    <div>
      
      <header className="navbar navbar-expand-lg navbar-light" >
        <div className="container-fluid">
          
          
          {/* Title */}
          <h2 className="mx-auto">Admin Dashboard</h2>

          <DropdownButton variant="secondary" title={<span><FontAwesomeIcon icon={faUserPlus} /> Add <FontAwesomeIcon icon={faAngleDown} /></span>} className="mx-2">
            <Dropdown.Item><Link to="/admin/add-employee"><FontAwesomeIcon icon={faUserPlus} /> Add Employee</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/add-department"><FontAwesomeIcon icon={faBuilding} /> Add Department</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/add-manager"><FontAwesomeIcon icon={faUsers} /> Add Manager</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/add-payroll-policy"><FontAwesomeIcon icon={faMoneyCheckAlt} /> Add Payroll Policy</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/add-payrollprocessor"><FontAwesomeIcon icon={faTasks} /> Add Payroll Processor</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/add-users"><FontAwesomeIcon icon={faTasks} /> Add User</Link></Dropdown.Item>
          </DropdownButton>

          {/* Manage dropdown */}
          <DropdownButton variant="secondary" title={<span><FontAwesomeIcon icon={faEdit} /> Manage <FontAwesomeIcon icon={faAngleDown} /></span>} className="mx-2">
            <Dropdown.Item><Link to="/admin/department"><FontAwesomeIcon icon={faBuilding} /> Departments</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/manager"><FontAwesomeIcon icon={faUsers} /> Managers</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/payroll-policies"><FontAwesomeIcon icon={faMoneyCheckAlt} /> Payroll Policies</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/update-employee"><FontAwesomeIcon icon={faUserCog} /> Update Employee</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/payrollprocessor"><FontAwesomeIcon icon={faTasks} /> Payroll Processor</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/users"><FontAwesomeIcon icon={faTasks} />Users</Link></Dropdown.Item>
          </DropdownButton>

          {/* Reports dropdown */}
          <DropdownButton variant="secondary" title={<span><FontAwesomeIcon icon={faChartBar} /> Reports <FontAwesomeIcon icon={faAngleDown} /></span>} className="mx-2">
            <Dropdown.Item><Link to="/admin/compliance-report"><FontAwesomeIcon icon={faFileAlt} /> Compliance Report</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin/audit-trails"><FontAwesomeIcon icon={faBookOpen} /> Audit Trails</Link></Dropdown.Item>
          </DropdownButton>

        </div>
      </header>

      {/* Main content area */}
      <div className="container mt-3">
      {/* Manager and Department Counts */}
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex flex-column align-items-center">
        <div className="card bg-transparent text-black rounded" style={{ width: '14rem' }}>
            <div className="card-header">
              <h3 className="card-title">Managers:</h3>
            </div>
            <div className="card-body">
              <h3 className="card-title big-font text-black">{managerCount}</h3>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
        <div className="card bg-transparent rounded" style={{ width: '14rem' }}>
            <div className="card-header">
              <h3 className="card-title text-black">Departments:</h3>
            </div>
            <div className="card-body">
              <h3 className="card-title big-font text-black">{departmentCount}</h3>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
        <div className="card bg-transparent text-black rounded" style={{ width: '14rem' }}>
            <div className="card-header">
              <h3 className="card-title">Users:</h3>
            </div>
            <div className="card-body">
              <h3 className="card-title big-font text-black">{userCount}</h3>
            </div>
          </div>
        </div>
      </div>

        {/* Audit Trails and Monthly Employee Count Chart */}
        <div className="d-flex justify-content-between mt-3">
          {/* Audit Trails */}
          <div className="card bg-transparent mb-3" style={{ width: '30rem' }}>
            <div className="card-header">
              <h3 className="card-title">Audit Trails</h3>
            </div>
            <div className="card-body" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
              <AuditTrails />
            </div>
          </div>

          {/* Monthly Employee Count Chart */}
          <div className="card bg-transparent" style={{ width: '30rem' }}>
            <div className="card-header">
              <h3 className="card-title">Monthly Employee Count</h3>
            </div>
            <div className="card-body">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;