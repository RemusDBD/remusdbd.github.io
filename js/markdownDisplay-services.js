document.addEventListener('DOMContentLoaded', function () {
    // Function to load the content dynamically into a specific div
    function loadContent(url, targetDiv) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(targetDiv).innerHTML = data;
                document.getElementById(targetDiv).style.display = 'block';
                document.getElementById('markdownDisplay').style.display = 'none'; // Hide main content
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // Event listener for the services link
    document.getElementById('services-link').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior
        loadContent('/docs/services', 'servicesContent'); // Load the services page
    });

    // Event listener for the consulting link (inside services content)
    document.getElementById('consulting-link').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior
        loadContent('/docs/services/consulting', 'consultingContent'); // Load the consulting page
    });

    // Additional event listener for the contact us button in consulting content
    document.getElementById('contactus-link').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior
        loadContent('/docs/contact-us', 'contactusContent'); // Load the contact-us page
    });
});
