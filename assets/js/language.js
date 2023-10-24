let translations = {}; // Ensure translations object is defined globally

// Variable to store the selected language
let selectedLanguage = 'de'; // Default language

// Function to toggle language
const toggleLanguage = (language) => {
    selectedLanguage = language;

    // Translate elements with data-translate-key attribute
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach((element) => {
        const key = element.getAttribute('data-translate-key');
        element.textContent = translations[selectedLanguage][key] || translations['en'][key];
    });

    // Update language for other specific elements manually if needed
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

            // Attach language toggle event listeners after translations are loaded
            attachLanguageToggleListeners();

            // Store the selected language in localStorage
            localStorage.setItem('selectedLanguage', savedLanguage);
        })
        .catch(error => console.error('Error loading translations:', error));
};

// Event listener for language toggle links
function attachLanguageToggleListeners() {
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
}

// Load translations when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadTranslations();
});
