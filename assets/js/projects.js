document.addEventListener('DOMContentLoaded', function() {
    function updateUIBasedOnHash() {
        const currentHash = window.location.hash.replace('#', '');
        const projectDetails = document.querySelectorAll('.project-details');
        const projectLinks = document.querySelectorAll('.project-link');
        const instructionsDiv = document.querySelector('.instructions'); // Get the instructions div

        // Hide all project details initially
        projectDetails.forEach(detail => {
            detail.style.display = 'none';
        });

        // Assume no link is active unless a matching hash is found
        projectLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Only proceed to mark a link as active if there is a currentHash
        if(currentHash) {
            projectLinks.forEach(link => {
                if(link.getAttribute('href').endsWith('#' + currentHash)) {
                    link.classList.add('active');
                }
            });

            const detailToDisplay = document.getElementById(currentHash);
            if(detailToDisplay) {
                detailToDisplay.style.display = 'grid';
                detailToDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Hide the instructions div when a project detail is displayed
                if(instructionsDiv) {
                    instructionsDiv.style.display = 'none';
                }
            }
        } else {
            // If there's no hash, ensure the instructions div is visible
            if(instructionsDiv) {
                instructionsDiv.style.display = 'block';
            }
        }
    }

    // Listen for hash changes to update the UI accordingly
    window.addEventListener('hashchange', updateUIBasedOnHash);

    // Also, update the UI on initial page load
    updateUIBasedOnHash();
});