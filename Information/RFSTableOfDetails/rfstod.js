document.addEventListener('DOMContentLoaded', function() {
    fetch('romFS-TableOfDetails.md')
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            document.getElementById('markdown-container').innerHTML = htmlContent;
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});