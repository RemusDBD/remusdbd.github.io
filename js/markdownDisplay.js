        document.getElementById('tools-link').addEventListener('click', function() {
            loadMarkdown('/docs/tools');
        });

      /*  document.getElementById('invest-link').addEventListener('click', function() {
            loadMarkdown('/docs/invest');
        }); */ //2024/10/29 duplicated?

        document.getElementById('services-link').addEventListener('click', function() {
            loadMarkdown('/docs/services');
        });

        document.getElementById('contactus-link').addEventListener('click', function() {
            loadMarkdown('/docs/contact-us');
        });

        document.getElementById('joinus-link').addEventListener('click', function() {
            loadMarkdown('/docs/joinus');
        });

        function loadMarkdown(file) {
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('markdownDisplay').innerHTML = markdownToHTML(data);
                })
                .catch(error => console.error('Error loading markdown:', error));
        }

        function markdownToHTML(markdown) {
            let html = markdown
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*(.*)\*/gim, '<em>$1</em>')
                .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
                .replace(/\n$/gim, '<br />');
            return html.trim();
        }
