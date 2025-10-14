document.addEventListener('DOMContentLoaded', () => {
  const addEmployeeForm = document.getElementById('add-employee-form');
  const filterEmployeeForm = document.getElementById('filter-employee-form');
  const employeeTableBody = document.getElementById('employee-table-body');
  const messageBox = document.getElementById('message-box');
  const loadingIndicator = document.getElementById('loading-indicator');
  const errorMessage = document.getElementById('error-message');
  const employeeDepartmentSelect = document.getElementById('employee-department');
  const filterDepartmentSelect = document.getElementById('filter-department');

  // Get JWT from localStorage
  const getToken = () => localStorage.getItem('token');

  // Show message in the message box
  function showMessage(message, isError = false) {
    messageBox.textContent = message;
    messageBox.classList.remove('hidden', 'text-green-500', 'text-red-500');
    messageBox.classList.add(isError ? 'text-red-500' : 'text-green-500', 'bg-neutral-100', 'dark:bg-neutral-800', 'p-3', 'rounded-lg');
    setTimeout(() => messageBox.classList.add('hidden'), 5000);
  }

  // Show/Hide loading and error states
  function setLoading(isLoading) {
    loadingIndicator.classList.toggle('hidden', !isLoading);
    errorMessage.classList.add('hidden');
    employeeTableBody.innerHTML = '';
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    loadingIndicator.classList.add('hidden');
  }

  // Populate department dropdowns
  async function populateDepartments() {
    try {
      const response = await fetch('http://localhost:8080/api/departments', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const departments = await response.json();
      
      employeeDepartmentSelect.innerHTML = '<option value="">Select Department</option>';
      filterDepartmentSelect.innerHTML = '<option value="">All Departments</option>';
      
      departments.forEach(dept => {
        const option1 = document.createElement('option');
        option1.value = dept;
        option1.textContent = dept;
        employeeDepartmentSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = dept;
        option2.textContent = dept;
        filterDepartmentSelect.appendChild(option2);
      });
      
      if (departments.length === 0) {
        showError('No departments found in the database.');
      }
    } catch (error) {
      showError('Failed to load departments. Ensure you are logged in and the server is running.');
      console.error('Error fetching departments:', error);
    }
  }

  // Fetch and display employees
  async function fetchEmployees(department = '') {
    setLoading(true);
    try {
      const url = department
        ? `http://localhost:8080/api/employees?department=${encodeURIComponent(department)}`
        : 'http://localhost:8080/api/employees';
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const employees = await response.json();
      
      employeeTableBody.innerHTML = '';
      employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="px-6 py-4 text-left">${emp.name}</td>
          <td class="px-6 py-4 text-left hidden md:table-cell">${emp.department}</td>
          <td class="px-6 py-4 text-center">${emp.email}</td>
        `;
        employeeTableBody.appendChild(row);
      });
      
      if (employees.length === 0) {
        employeeTableBody.innerHTML = '<tr><td colspan="3" class="px-6 py-4 text-center text-neutral-500 dark:text-neutral-400">No employees found.</td></tr>';
      }
    } catch (error) {
      showError('Failed to load employees. Ensure you are logged in and the server is running.');
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  }

  // Handle add employee form submission
  addEmployeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('employee-name').value.trim();
    const email = document.getElementById('employee-email').value.trim();
    const department = employeeDepartmentSelect.value;

    if (!name || !email || !department) {
      showMessage('Please fill in all fields.', true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ name, email, department })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newEmployee = await response.json();
      showMessage(`Employee ${newEmployee.name} added successfully!`);
      addEmployeeForm.reset();
      await fetchEmployees(filterDepartmentSelect.value);
    } catch (error) {
      showMessage('Failed to add employee. Ensure you are logged in and the server is running.', true);
      console.error('Error adding employee:', error);
    }
  });

  // Handle filter form submission
  filterEmployeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const department = filterDepartmentSelect.value;
    await fetchEmployees(department);
  });

  // Initialize page
  populateDepartments();
  fetchEmployees();
});