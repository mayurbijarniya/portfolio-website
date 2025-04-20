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

    // --- Highlights Carousel Logic ---
    const carousel = document.querySelector('.highlights-carousel');

    // Only run if the carousel container exists on the page
    if (carousel) {
        const wrapper = carousel.querySelector('.highlights-wrapper');
        const items = carousel.querySelectorAll('.achievement-item');
        const totalItems = items.length;
        const itemsPerPage = window.innerWidth <= 768 ? 1 : 2; // Show 1 on mobile, 2 on desktop
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        let currentPage = 0;
        let slideInterval;

        function updateCarousel() {
            // Recalculate itemsPerPage based on current window width
            const newItemsPerPage = window.innerWidth <= 768 ? 1 : 2;
            const newTotalPages = Math.ceil(totalItems / newItemsPerPage);

            // Apply translation
            const translation = -currentPage * (100 / newItemsPerPage); // Adjust translation based on items per page
             // Ensure translation doesn't exceed bounds after resize
            if (currentPage >= newTotalPages) {
                currentPage = newTotalPages > 0 ? newTotalPages - 1 : 0;
            }
            wrapper.style.transform = `translateX(${translation * newItemsPerPage}%)`; // Recalculate transform


            // Optional: Handle active class for opacity effect
            // items.forEach(item => item.classList.remove('active'));
            // const startIndex = currentPage * newItemsPerPage;
            // for (let i = 0; i < newItemsPerPage && (startIndex + i) < totalItems; i++) {
            //     if (items[startIndex + i]) {
            //         items[startIndex + i].classList.add('active');
            //     }
            // }
        }


        function nextSlide() {
            const currentItemsPerPage = window.innerWidth <= 768 ? 1 : 2;
            const currentTotalPages = Math.ceil(totalItems / currentItemsPerPage);

            currentPage++;
            if (currentPage >= currentTotalPages) {
                currentPage = 0; // Loop back to the start
            }
            updateCarousel(); // Apply the changes
        }

        // Initial setup
        if (totalItems > itemsPerPage) { // Only start sliding if there's more than one page
             // Optional: Set initial active items
            // updateCarousel();
             slideInterval = setInterval(nextSlide, 5000); // Change 5000 (milliseconds) for slide duration

            // Optional: Pause on hover
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', () => {
                 // Clear existing before setting new one to avoid duplicates
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });


        } else {
             // If not enough items to slide, ensure they are visible and centered if needed
             wrapper.style.justifyContent = 'center'; // Center items if fewer than itemsPerPage
             // Optional: Add active class to all visible items if not sliding
             // items.forEach(item => item.classList.add('active'));
        }

         // Re-calculate on window resize
        window.addEventListener('resize', () => {
             clearInterval(slideInterval); // Stop interval during resize
             const newItemsPerPage = window.innerWidth <= 768 ? 1 : 2;
             const newTotalPages = Math.ceil(totalItems / newItemsPerPage);
             // Try to maintain the visual position roughly
             currentPage = Math.min(currentPage, newTotalPages > 0 ? newTotalPages - 1 : 0);
             updateCarousel();
             // Restart interval only if needed
             if (totalItems > newItemsPerPage) {
                 slideInterval = setInterval(nextSlide, 5000);
             } else {
                 wrapper.style.justifyContent = 'center';
             }
        });


    } else {
        console.log("Highlights carousel element not found.");
    }
    // --- End Highlights Carousel Logic ---

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