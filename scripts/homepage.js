// Projects data
// import projectsData from '../projects/projects.json';
const projectsData = fetch('../../projects/projects.json');
console.log(projectsData)

// Areas mapping
const AREAS = {
    0: 'developer',
    1: 'data-analyst'
};

// Function to generate project cards
function generateProjectCards() {
    // Convert projects to array and sort from most recent to least recent
    const projects = Object.entries(projectsData)
        .map(([key, project]) => ({ ...project, id: key }))
        .sort((a, b) => Object.keys(projectsData).indexOf(b.id) - Object.keys(projectsData).indexOf(a.id));

    // Generate cards for each area section
    Object.values(AREAS).forEach(area => {
        const projectGridSelector = area === 'developer' 
            ? '.developer-projects' 
            : '.data-analyst-projects';
        const projectGrid = document.querySelector(projectGridSelector);
        const allProjectsGrid = document.querySelector('.all-projects');

        // Clear existing projects
        projectGrid.innerHTML = '';

        // Filter projects for the current area
        const areaProjects = projects.filter(project => 
            AREAS[project.area] === area
        );

        // Generate cards
        areaProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectGrid.appendChild(projectCard);

            // Also add to All Projects grid
            const allProjectsCard = createProjectCard(project);
            allProjectsGrid.appendChild(allProjectsCard);
        });
    });
}

// Function to create a single project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project', project['html-file']);

    card.innerHTML = `
        <div class="project-card-inner">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-card-overlay">
                <span>View Details</span>
            </div>
        </div>
    `;

    // Add click event listener for popup
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openProjectPopup(projectId);
    });

    return card;
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', generateProjectCards);