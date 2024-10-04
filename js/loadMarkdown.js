  async function loadMarkdown(mdFile) {
    try {
      const response = await fetch(mdFile);
      const markdown = await response.text();

      // Convert the Markdown to HTML (you'll need a library like marked.js for this)
      const htmlContent = marked(markdown);

      // Inject the HTML content into the div
      document.getElementById('content-section').innerHTML = htmlContent;
    } catch (error) {
      console.error('Error loading markdown file:', error);
      document.getElementById('content-section').innerHTML = '<p>Content could not be loaded.</p>';
    }
  }
