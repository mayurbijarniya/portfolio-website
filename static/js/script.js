// Wait for the entire HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', (event) => {

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add 'scrolled' class after scrolling 50px
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    } else {
        console.warn("Navbar element not found for scroll effect.");
    }

    // --- Dark Mode Logic Start ---
    const toggleButton = document.getElementById('darkModeToggle'); // Find the button using its ID
    const body = document.body;                                     // Get the body element
    const toggleIcon = toggleButton ? toggleButton.querySelector('i') : null; // Get the icon within the button (if it exists)

    // Function to apply the chosen theme (light or dark)
    const applyTheme = (theme) => {
        body.classList.remove('dark-mode', 'light-mode'); // Remove any existing theme class first for clean state

        if (theme === 'dark') {
            body.classList.add('dark-mode'); // Add 'dark-mode' class to body
            if (toggleIcon) { // If an icon element exists...
                 toggleIcon.classList.remove('fa-moon'); // Remove the moon icon class
                 toggleIcon.classList.add('fa-sun');     // Add the sun icon class
            }
            // Ensure the button itself has appropriate contrast if needed
            if (toggleButton) {
                 toggleButton.setAttribute('aria-label', 'Switch to light mode');
            }
        } else {
            body.classList.add('light-mode'); // Add 'light-mode' class (optional, could just rely on default)
            if (toggleIcon) { // If an icon element exists...
                toggleIcon.classList.remove('fa-sun');  // Remove the sun icon class
                toggleIcon.classList.add('fa-moon'); // Add the moon icon class
            }
             if (toggleButton) {
                 toggleButton.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    };

    // Function to toggle the theme and save the preference
    const toggleTheme = () => {
        // Check if the body *currently* has the 'dark-mode' class
        let isDarkMode = body.classList.contains('dark-mode');
        // Determine the *new* theme
        let newTheme = isDarkMode ? 'light' : 'dark';

        localStorage.setItem('theme', newTheme); // Save the *new* theme choice to the browser's local storage
        applyTheme(newTheme); // Apply the *new* theme visually
    };

    // --- Initialization ---
    // Check if a theme preference is already saved in local storage
    const savedTheme = localStorage.getItem('theme');

    // Determine the initial theme:
    // 1. Use saved theme if available
    // 2. Otherwise, check system preference (optional)
    // 3. Default to 'light' if neither is set
    let initialTheme = 'light'; // Default theme
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Uncomment the line below to respect system preference if no theme is saved
        // initialTheme = 'dark';
    }

    // Apply the determined initial theme when the page loads
    applyTheme(initialTheme);

    // --- Event Listener ---
    // Make the button clickable *only if* the button was found in the HTML
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme); // When the button is clicked, run the toggleTheme function
    } else {
        console.warn("Dark mode toggle button (#darkModeToggle) not found in the HTML."); // Warn if button is missing
    }
    // --- Dark Mode Logic End ---


    // --- Add any other existing JavaScript code you have below this line ---
    // Example: Loading animation hiding
    const loadingScreen = document.querySelector('.loading');
    if (loadingScreen) {
        window.addEventListener('load', () => {
             setTimeout(() => { // Add a small delay for effect if desired
                loadingScreen.classList.add('hide');
             }, 200); // 200ms delay example
        });
    }

     // Example: Smooth scrolling for anchor links (if you use them)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


}); // End of DOMContentLoaded listener