document.addEventListener('DOMContentLoaded', function() {
    fetch('model-swapping.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(markdown => {
            const htmlContent = marked(markdown);
            document.getElementById('markdown-container').innerHTML = htmlContent;
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});
