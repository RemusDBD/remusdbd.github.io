document.addEventListener('DOMContentLoaded', function () {
    // Function to load the content dynamically into a specific div
    function loadContent(url, targetDiv) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(targetDiv).innerHTML = data;
                document.getElementById(targetDiv).style.display = 'block';
                document.getElementById('markdownDisplay_foss').style.display = 'none'; // Hide main content
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // Event listener for the services link
    document.getElementById('joinus-link').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior
        loadContent('/docs/joinus', 'joinusContent'); // Load the services page
    });

    // Event delegation for dynamically loaded content
    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'foss-link') {
            e.preventDefault(); // Prevent default behavior
            loadContent('/docs/joinus/website-developer', 'fossContent'); // Load the foss page
        } else if (e.target && e.target.id === 'contactus-link') {
            e.preventDefault(); // Prevent default behavior
            loadContent('/docs/contact-us', 'contactusContent'); // Load the contact-us page
        }
    });
});
