 // Project Details Data (could be expanded to a separate JSON file)
 const projectDetails = {
    'developer-project1': {
        title: 'Web Application',
        description: 'Detailed description of the web application project.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        githubLink: '#',
        liveDemoLink: '#'
    },
    'developer-project2': {
        title: 'Mobile App',
        description: 'Comprehensive description of the mobile application project.',
        technologies: ['React Native', 'Redux', 'Firebase'],
        githubLink: '#',
        liveDemoLink: '#'
    },
    'data-analyst-project1': {
        title: 'Market Analysis',
        description: 'In-depth market trend research and analysis project.',
        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
        githubLink: '#',
        reportLink: '#'
    },
    'data-analyst-project2': {
        title: 'Predictive Modeling',
        description: 'Machine learning prediction project with comprehensive data insights.',
        technologies: ['Python', 'Scikit-learn', 'NumPy', 'Jupyter Notebook'],
        githubLink: '#',
        reportLink: '#'
    }
};

// DOM Elements
const mainContent = document.getElementById('main-content');
const projectDetailsOverlay = document.getElementById('project-details-overlay');
const projectDetailsContent = document.querySelector('.project-details-content');
const backToProjectsButton = document.getElementById('back-to-projects');

// Project Card Click Handler
document.addEventListener('click', (e) => {
    const projectCard = e.target.closest('.project-card');
    if (projectCard) {
        const projectId = projectCard.getAttribute('data-project');
        showProjectDetails(projectId);
    }
});

// Show Project Details
function showProjectDetails(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;

    // Create project details HTML
    const detailsHTML = `
        <div class="project-header">
            <h1>${project.title}</h1>
        </div>
        <div class="project-content">
            <div class="project-description">
                <h2>Project Overview</h2>
                <p>${project.description}</p>
            </div>

            <div class="project-technologies">
                <h2>Technologies Used</h2>
                <ul>
                    ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>

            <div class="project-links">
                ${project.githubLink ? `<a href="${project.githubLink}" class="project-link github">GitHub Repository</a>` : ''}
                ${project.liveDemoLink ? `<a href="${project.liveDemoLink}" class="project-link live-demo">Live Demo</a>` : ''}
                ${project.reportLink ? `<a href="${project.reportLink}" class="project-link report">Project Report</a>` : ''}
            </div>
        </div>
    `;

    // Show project details
    projectDetailsContent.innerHTML = detailsHTML;
    mainContent.style.display = 'none';
    projectDetailsOverlay.classList.add('active');
}

// Back to Projects
backToProjectsButton.addEventListener('click', () => {
    projectDetailsOverlay.classList.remove('active');
    mainContent.style.display = 'block';
});

// Existing section toggle script remains the same
const toggleButtons = document.querySelectorAll('.toggle-btn');
const sections = document.querySelectorAll('.section');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked button and corresponding section
        button.classList.add('active');
        document.getElementById(button.dataset.section).classList.add('active');
    });
});