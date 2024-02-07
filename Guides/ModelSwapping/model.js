// No import statement needed; 'marked' is a global function
document.addEventListener('DOMContentLoaded', function() {
    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown); // If 'marked' is not a function, this line will fail
            document.getElementById('markdown-container').innerHTML = htmlContent;
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});
