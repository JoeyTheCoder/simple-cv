let translations;

// Function to toggle language
const toggleLanguage = (language) => {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach((element) => {
        const key = element.getAttribute('data-translate');
        element.innerHTML = translations[language][key] || translations['en'][key];
    });
};

// Function to load translations from the JSON file
const loadTranslations = () => {
    fetch('assets/js/translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            const savedLanguage = localStorage.getItem('selectedLanguage') || 'de';
            document.documentElement.lang = savedLanguage;
            toggleLanguage(savedLanguage);

            // Add 'active' class to the saved language link
            const savedLangLink = document.querySelector(`[data-lang="${savedLanguage}"]`);
            if (savedLangLink) {
                savedLangLink.classList.add('active');
            }
        })
        .catch(error => console.error('Error loading translations:', error));
};

// Event listener for language toggle links
document.querySelectorAll('.lang-toggle').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const newLanguage = event.target.getAttribute('data-lang');
        document.documentElement.lang = newLanguage;
        toggleLanguage(newLanguage);

        // Remove 'active' class from all links
        document.querySelectorAll('.lang-toggle').forEach((link) => {
            link.classList.remove('active');
        });

        // Add 'active' class to the clicked link
        event.target.classList.add('active');

        // Save the selected language to localStorage
        localStorage.setItem('selectedLanguage', newLanguage);
    });
});

// Load translations when the DOM is ready
document.addEventListener('DOMContentLoaded', loadTranslations);
