const API_URLS = {
    employees: '/api/employees',
    departments: '/api/departments',
    projects: '/api/projects'
};

const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage = document.getElementById('error-message');
const employeeTableBody = document.getElementById('employee-table-body');
const projectTableBody = document.getElementById('project-table-body');
const totalEmployees = document.getElementById('total-employees');
const totalDepartments = document.getElementById('total-departments');
const totalProjects = document.getElementById('total-projects');

function showMessage(message, isError = true) {
    errorMessage.textContent = message;
    errorMessage.classList.toggle('hidden', !message);
    errorMessage.classList.toggle('text-red-500', isError);
    errorMessage.classList.toggle('text-primary', !isError);
    if (message) {
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    }
}

async function fetchDashboardData() {
    loadingIndicator.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    try {
        const [employeeResponse, departmentResponse, projectResponse] = await Promise.all([
            fetch(API_URLS.employees),
            fetch(API_URLS.departments),
            fetch(API_URLS.projects)
        ]);

        if (!employeeResponse.ok || !departmentResponse.ok || !projectResponse.ok) {
            throw new Error('Failed to fetch data from one or more endpoints.');
        }

        const employees = await employeeResponse.json();
        const departments = await departmentResponse.json();
        const projects = await projectResponse.json();

        // Update summary cards
        totalEmployees.textContent = employees.length;
        totalDepartments.textContent = departments.length;
        totalProjects.textContent = projects.length;

        // Render recent employees (last 5)
        renderEmployees(employees.slice(0, 5));
        // Render recent projects (last 5)
        renderProjects(projects.slice(0, 5));

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        showMessage('Error loading data. Please ensure the backend is running.');
        employeeTableBody.innerHTML = '<tr><td colspan="3" class="px-6 py-4 text-center text-red-500">Failed to load employee data.</td></tr>';
        projectTableBody.innerHTML = '<tr><td colspan="4" class="px-6 py-4 text-center text-red-500">Failed to load project data.</td></tr>';
    } finally {
        loadingIndicator.classList.add('hidden');
    }
}

function renderEmployees(employees) {
    employeeTableBody.innerHTML = '';
    if (employees.length === 0) {
        employeeTableBody.innerHTML = '<tr><td colspan="3" class="px-6 py-4 text-center text-muted-light dark:text-muted-dark">No employees found.</td></tr>';
        return;
    }
    employees.forEach(employee => {
        const statusClass = employee.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted-light/20 dark:bg-muted-dark/20 text-muted-light dark:text-text-dark';
        const row = `
            <tr class="border-t border-border-light dark:border-border-dark">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${employee.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-light dark:text-muted-dark">${employee.department || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClass}">${employee.status}</span>
                </td>
            </tr>
        `;
        employeeTableBody.insertAdjacentHTML('beforeend', row);
    });
}

function renderProjects(projects) {
    projectTableBody.innerHTML = '';
    if (projects.length === 0) {
        projectTableBody.innerHTML = '<tr><td colspan="4" class="px-6 py-4 text-center text-muted-light dark:text-muted-dark">No projects found.</td></tr>';
        return;
    }
    projects.forEach(project => {
        const statusClass = project.status === 'Completed' ? 'bg-green-900/50 text-green-300' : 'bg-primary/10 text-primary';
        const row = `
            <tr class="border-t border-border-light dark:border-border-dark">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${project.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-light dark:text-muted-dark">${project.department || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClass}">${project.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-light dark:text-muted-dark text-center">${project.dueDate || 'N/A'}</td>
            </tr>
        `;
        projectTableBody.insertAdjacentHTML('beforeend', row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDashboardData();
});