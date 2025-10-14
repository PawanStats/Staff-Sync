const API_URLS = {
    projects: '/api/projects',
    departments: '/api/departments'
};

const projectForm = document.getElementById('add-project-form');
const filterForm = document.getElementById('filter-project-form');
const projectTableBody = document.getElementById('project-table-body');
const departmentSelect = document.getElementById('project-department');
const filterDepartmentSelect = document.getElementById('filter-department');
const loadingIndicator = document.getElementById('loading-indicator');
const messageBox = document.getElementById('message-box');
const projectStatusChartCanvas = document.getElementById('project-status-chart');
let projectStatusChart = null;

function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = 'mt-4 p-3 rounded-lg text-sm transition-opacity duration-300';
    switch (type) {
        case 'success':
            messageBox.classList.add('bg-green-100', 'text-green-800', 'dark:bg-green-900/20', 'dark:text-green-300');
            break;
        case 'error':
            messageBox.classList.add('bg-red-100', 'text-red-800', 'dark:bg-red-900/20', 'dark:text-red-300');
            break;
        default:
            messageBox.classList.add('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900/20', 'dark:text-blue-300');
    }
    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 5000);
}

async function fetchDepartments() {
    try {
        const response = await fetch(API_URLS.departments);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const departments = await response.json();
        populateDepartmentSelects(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        showMessage('Error loading departments.', 'error');
    }
}

function populateDepartmentSelects(departments) {
    [departmentSelect, filterDepartmentSelect].forEach(select => {
        if (select) {
            select.innerHTML = '<option value="">Select Department</option>';
            departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.name;
                option.textContent = dept.name;
                select.appendChild(option);
            });
        }
    });
}

async function fetchProjects(filters = {}) {
    loadingIndicator.classList.remove('hidden');
    try {
        let url = API_URLS.projects;
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.department) params.append('department', filters.department);
        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const projects = await response.json();
        renderProjects(projects);
        renderProjectStatusChart(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        showMessage('Error loading projects. Please ensure the backend is running.', 'error');
        projectTableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-red-500">Failed to load project data.</td></tr>';
        if (projectStatusChart) projectStatusChart.destroy();
        projectStatusChartCanvas.style.display = 'none';
    } finally {
        loadingIndicator.classList.add('hidden');
    }
}

function renderProjects(projects) {
    projectTableBody.innerHTML = '';
    if (projects.length === 0) {
        projectTableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-neutral-500 dark:text-neutral-400">No projects found.</td></tr>';
        return;
    }
    projects.forEach(project => {
        const statusClass = project.status === 'Completed' ? 'bg-green-900/50 text-green-300' : 'bg-primary/10 text-primary';
        const row = `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-cover bg-center"></div>
                        <div>
                            <div class="font-semibold text-white">${project.name}</div>
                            <div class="text-neutral-400 text-xs">${project.description || 'No description'}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">${project.department || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div class="flex items-center gap-1 text-yellow-400">
                        <span class="material-symbols-outlined text-base">star</span>
                        <span class="material-symbols-outlined text-base">star</span>
                        <span class="material-symbols-outlined text-base">star</span>
                        <span class="material-symbols-outlined text-base">star</span>
                        <span class="material-symbols-outlined text-base">star</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}">${project.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-neutral-400">${project.dueDate || 'N/A'}</td>
            </tr>
        `;
        projectTableBody.insertAdjacentHTML('beforeend', row);
    });
}

function renderProjectStatusChart(projects) {
    const statusCounts = projects.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
    }, {});
    
    const labels = ['In Progress', 'Completed', 'On Hold'];
    const data = labels.map(status => statusCounts[status] || 0);
    
    if (projectStatusChart) projectStatusChart.destroy();
    
    projectStatusChart = new Chart(projectStatusChartCanvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#1173d4', '#22c55e', '#f59e0b'],
                borderColor: ['#0a5299', '#15803d', '#b45309'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#1f2937'
                    }
                },
                title: {
                    display: true,
                    text: 'Projects by Status',
                    color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#1f2937'
                }
            }
        }
    });
    projectStatusChartCanvas.style.display = 'block';
}

async function handleProjectFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newProject = {
        name: form['project-name'].value.trim(),
        department: form['project-department'].value,
        status: form['project-status'].value,
        priority: form['project-priority'].value,
        dueDate: form['project-due-date'].value || null,
        description: form['project-description'].value.trim()
    };

    if (!newProject.name) {
        showMessage('Project name is required.', 'info');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="material-symbols-outlined align-middle mr-1" style="font-size: 1.1rem;">schedule</span> Adding...';

    try {
        const response = await fetch(API_URLS.projects, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });
        if (!response.ok) throw new Error(`Failed to add project. Status: ${response.status}`);
        showMessage(`Successfully added project: ${newProject.name}`, 'success');
        form.reset();
        fetchProjects();
    } catch (error) {
        console.error('Error adding project:', error);
        showMessage('Error adding project.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<span class="material-symbols-outlined align-middle mr-1" style="font-size: 1.1rem;">add</span> Add Project';
    }
}

async function handleFilterFormSubmit(event) {
    event.preventDefault();
    const filters = {
        status: document.getElementById('filter-status').value,
        department: document.getElementById('filter-department').value
    };
    await fetchProjects(filters);
}

document.addEventListener('DOMContentLoaded', () => {
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectFormSubmit);
    }
    if (filterForm) {
        filterForm.addEventListener('submit', handleFilterFormSubmit);
    }
    fetchDepartments();
    fetchProjects();
});