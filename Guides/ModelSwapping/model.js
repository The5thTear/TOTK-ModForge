document.addEventListener('DOMContentLoaded', function() {
    const markdownContainer = document.getElementById('markdown-container');
    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            markdownContainer.innerHTML = htmlContent; // Only update the innerHTML of the markdown container
        })
        .catch(error => console.error('Error fetching Markdown:', error));

    let scale = 1; // base scale level

    document.getElementById('zoom-in').addEventListener('click', function() {
        scale += 0.1;
        markdownContainer.style.transform = 'scale(' + scale + ')';
    });

    document.getElementById('zoom-out').addEventListener('click', function() {
        scale -= 0.1;
        if (scale < 0.1) { scale = 0.1; } // prevent container from becoming too small
        markdownContainer.style.transform = 'scale(' + scale + ')';
    });
});
