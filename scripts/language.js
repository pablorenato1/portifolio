// Language management
const translations = {
    en: null,
    pt: null
};

// Load language files
async function loadLanguage(lang) {
    if (!translations[lang]) {
        const response = await fetch(`https://raw.githubusercontent.com/pablorenato1/portifolio/main/locales/${lang}.json`);
        translations[lang] = await response.json();
    }
    return translations[lang];
}

// Apply translations
async function setLanguage(lang) {
    const languageData = await loadLanguage(lang);
    
    // Update navigation buttons
    document.querySelector('[data-section="data-analyst"]').textContent = languageData.nav["data-analyst"];
    document.querySelector('[data-section="developer"]').textContent = languageData.nav.developer;
    document.querySelector('[data-section="projects"]').textContent = languageData.nav.projects;

    // Update section headers
    document.querySelector('#data-analyst h2').textContent = languageData.sections["data-analyst-expertise"];
    document.querySelector('#developer h2').textContent = languageData.sections["developer-expertise"];
    document.querySelector('#projects h2').textContent = languageData.sections["all-projects"];

    // Update project section titles
    const projectSectionTitles = document.querySelectorAll('.projects-section-title');
    projectSectionTitles[0].textContent = languageData.sections["data-analyst-projects"];
    projectSectionTitles[1].textContent = languageData.sections["developer-projects"];

    // Update skills section headers
    const skillHeaders = document.querySelectorAll('.skill-card h3');
    skillHeaders[0].textContent = languageData.skills["programming-languages"];
    skillHeaders[1].textContent = languageData.skills["data-tools"];
    skillHeaders[2].textContent = languageData.skills["visualization"];
    if (skillHeaders[3]) skillHeaders[3].textContent = languageData.skills["programming-languages"];
    if (skillHeaders[4]) skillHeaders[4].textContent = languageData.skills["frameworks"];
    if (skillHeaders[5]) skillHeaders[5].textContent = languageData.skills["tools"];

    // Store current language in localStorage
    localStorage.setItem('portfolio-language', lang);
}

// Language switcher setup
document.addEventListener('DOMContentLoaded', () => {

    // Language select event listener
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // Load default/saved language
    const savedLanguage = localStorage.getItem('portfolio-language') || 'en';
    languageSelect.value = savedLanguage;
    setLanguage(savedLanguage);
});

// Rest of the existing language.js code remains the same