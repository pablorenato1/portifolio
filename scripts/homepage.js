
// Areas mapping
const AREAS = {
    0: 'developer',
    1: 'data-analyst'
};

// Function to generate project cards
async function generateProjectCards() {

    // Projects data
    const response = await fetch('https://raw.githubusercontent.com/pablorenato1/portifolio/main/projects/projects.json');
    const projectsData = await response.json()
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

 // Toggle between sections
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

 function openProjectPopup(projectId) {
     // Assuming you have a popup/modal element with an ID 'project-details-popup'
     const popup = document.getElementById('project-details-popup');
     
     // Assuming you have a content area inside the popup with an ID 'project-details-content'
     const popupContent = document.getElementById('project-details-content');
     
     // Load the specific project details HTML
     fetch(`projects/${projectId}.html`)
         .then(response => response.text())
         .then(html => {
             popupContent.innerHTML = html;
             
             // Show the popup
             popup.style.display = 'block';
             
             // Prevent body scrolling
             document.body.classList.add('popup-open');
         })
         .catch(error => {
             console.error('Error loading project details:', error);
             // Optional: Show an error message in the popup
             popupContent.innerHTML = '<p>Error loading project details.</p>';
             popup.style.display = 'flex';
             document.body.classList.add('popup-open');
         });
 }

 function setDisplayToNone() {
     const popup = document.getElementById('project-details-popup');
     popup.style.display = 'none'
     document.body.classList.remove('popup-open');
 }
