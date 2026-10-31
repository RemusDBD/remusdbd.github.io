document.addEventListener('DOMContentLoaded', function () {
    // Function to load the content dynamically into a specific div
    function loadContent(url, targetDivId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Inject the fetched data into the target container
                document.getElementById(targetDivId).innerHTML = data;
                // Show the contact us content div
                document.getElementById(targetDivId).style.display = 'block';
                // Hide the main markdown display div
                document.getElementById('markdownDisplay').style.display = 'none';
                // Bring the panel into view; the hero above it fills the screen
                document.getElementById(targetDivId).scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // Event listener for the contact-us link
    document.getElementById('contactus-link').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior
        loadContent('/docs/contact-us', 'markdownDisplay_contactus'); // Use the correct div ID
    });
});
