// Language management
const translations = {
    en: null,
    pt: null
};

// Load language files
async function loadLanguage(lang) {
    if (!translations[lang]) {
        const response = await fetch(`locales/${lang}.json`);
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
    if (skillHeaders[3]) skillHeaders[3].textContent = languageData.skills["frameworks"];
    if (skillHeaders[4]) skillHeaders[4].textContent = languageData.skills["tools"];

    // Store current language in localStorage
    localStorage.setItem('portfolio-language', lang);
}

// Language switcher setup
document.addEventListener('DOMContentLoaded', () => {
    // Add language switcher to header
    const header = document.querySelector('header');
    const languageSwitcher = document.createElement('div');
    languageSwitcher.innerHTML = `
        <div class="language-switcher">
            <button id="lang-en">🇺🇸 EN</button>
            <button id="lang-pt">🇧🇷 PT</button>
        </div>
    `;
    header.appendChild(languageSwitcher);

    // Add event listeners
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-pt').addEventListener('click', () => setLanguage('pt'));

    // Load default/saved language
    const savedLanguage = localStorage.getItem('portfolio-language') || 'en';
    setLanguage(savedLanguage);
});