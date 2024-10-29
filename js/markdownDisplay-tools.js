document.addEventListener('DOMContentLoaded', function () {
    // Function to load the content dynamically into a specific div
    function loadContent(url, targetDiv) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(targetDiv).innerHTML = data;
                document.getElementById(targetDiv).style.display = 'block';
               // document.getElementById('markdownDisplay_tools').style.display = 'none'; // Hide main content // 2024/10/29
                 //<!-- duplicated -->//
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // Event listener for the tools link
    document.getElementById('tools-link').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior
      //  loadContent('/docs/tools', 'toolsContent'); // Load the tools page //2024/10/29
             //<!-- duplicated -->//
    });

// Event delegation for dynamically loaded content
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'tools-link') {
        e.preventDefault(); // Prevent default behavior
              //  window.location.href = '/docs/tools/tools.html'; // Redirect to tools page // 2024/10/29
                //<!-- no more redirect -->//
           // loadContent('/docs/tools/', 'toolsContent'); // Load the tools page // 2024/10/29
                //<!-- duplicated -->//
    } else if (e.target && e.target.id === 'contactus-link') {
        e.preventDefault(); // Prevent default behavior
      //  window.location.href = '/docs/contact-us'; // Redirect to contact-us page // 2024/10/29
        //<!-- no more redirect -->//
            loadContent('/docs/contact-us', 'contactusContent'); // Load the contact-us page
        }
    });
});
