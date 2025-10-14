// Navigation mapping for all pages
const navigationMap = {
  'dashboard': 'Dashboard.html',
  'employees': 'Employees.html',
  'departments': 'Department.html',
  'reports': 'Reports.html',
  'welcome': 'Welcome Page.html',
  'login' : 'login.html'
};

// Get current page
function getCurrentPage() {
  const path = window.location.pathname;
  return path.split('/').pop() || 'Welcome Page.html';
}

// Navigate to a page
function navigateTo(page) {
  if (!page) return;
  
  const pageFile = navigationMap[page.toLowerCase()];
  if (pageFile) {
    window.location.href = pageFile;
  } else {
    console.warn('Page not found in navigation map:', page);
  }
}

// Mark active nav link
function markActiveNavLink() {
  const currentPage = getCurrentPage().toLowerCase().replace('.html', '');
  const navLinks = document.querySelectorAll('nav a, header a');
  
  navLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    
    // Check if link matches current page
    let isActive = false;
    for (let page in navigationMap) {
      if (linkText.includes(page) && currentPage.includes(page)) {
        isActive = true;
        break;
      }
    }
    
    // Add/remove active class
    if (isActive) {
      link.classList.add('text-primary', 'font-bold');
      link.classList.remove('text-neutral-600', 'dark:text-neutral-300', 'text-sm');
    }
  });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Navigation script loaded');
  
  // Mark current active link
  markActiveNavLink();
  
  // Setup navigation links
  const navLinks = document.querySelectorAll('nav a, header a[href="#"]');
  
  navLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    
    // Skip if it's already an active link styled
    if (link.classList.contains('font-bold') && link.classList.contains('text-primary')) {
      link.style.cursor = 'pointer';
      link.addEventListener('click', function(e) {
        e.preventDefault();
      });
      return;
    }
    
    // Check each navigation page
    for (let page in navigationMap) {
      if (linkText.includes(page)) {
        link.style.cursor = 'pointer';
        
        link.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Navigating to:', page);
          navigateTo(page);
        });
        
        break;
      }
    }
  });

  // Handle "Get Started" button on welcome page
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    if (btn.textContent.includes('Get Started')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Navigating to login page');
        window.location.href = 'login.html';
      });
    }
  });

  // Handle login form submission
  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      
      if (!emailInput || !passwordInput) {
        console.error('Form inputs not found');
        return;
      }
      
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      
      // Basic validation
      if (!email) {
        alert('Please enter your Manager ID or Email');
        emailInput.focus();
        return;
      }
      
      if (!password) {
        alert('Please enter your Password');
        passwordInput.focus();
        return;
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) && !email.toLowerCase().includes('manager')) {
        alert('Please enter a valid Manager ID or Email');
        return;
      }
      
      console.log('Login credentials validated');
      console.log('Navigating to Dashboard');
      
      // Navigate to dashboard on successful validation
      window.location.href = 'Dashboard.html';
    });
  }
  
  // Handle "Add Employee", "Add Department", "Generate Report" buttons
  const actionButtons = document.querySelectorAll('button');
  actionButtons.forEach(btn => {
    const btnText = btn.textContent.toLowerCase();
    
    if (btnText.includes('add employee') || btnText.includes('add department') || btnText.includes('generate report')) {
      btn.addEventListener('click', function(e) {
        if (!this.textContent.includes('Add') && !this.textContent.includes('Generate')) return;
        
        // For demo purposes, you can add modal or form handling here
        console.log('Button clicked:', this.textContent);
      });
    }
    
    if (btnText.includes('view all employees')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Navigating to employees page');
        navigateTo('employees');
      });
    }
  });
});