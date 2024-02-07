document.addEventListener('DOMContentLoaded', function() {
    const markdownContainer = document.getElementById('markdown-container');
    const navigationContainer = document.getElementById('navigation-container');
    let scale = 1; // base scale level

    // Fetch and display the markdown content
    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            markdownContainer.innerHTML = htmlContent;

            // Create markers after the markdown content is loaded
            const headers = document.querySelectorAll('#markdown-container h1, #markdown-container h2');
            headers.forEach((header, index) => {
                const marker = document.createElement('div');
                marker.classList.add('marker');
                const headerPosition = (header.offsetTop + header.clientHeight / 2) / markdownContainer.scrollHeight * 100;
                marker.style.top = headerPosition + '%';
                marker.textContent = header.textContent; // Set the text content of the marker

                marker.addEventListener('click', () => {
                    window.scrollTo({ top: header.offsetTop, behavior: 'smooth' });
                });

                navigationContainer.appendChild(marker);
            });
        })
        .catch(error => console.error('Error fetching Markdown:', error));
    // Zoom in button event listener
    document.getElementById('zoom-in').addEventListener('click', function() {
        scale += 0.1;
        markdownContainer.style.transform = 'scale(' + scale + ')';
    });

    // Zoom out button event listener
    document.getElementById('zoom-out').addEventListener('click', function() {
        scale -= 0.1;
        if (scale < 0.1) { scale = 0.1; }
        markdownContainer.style.transform = 'scale(' + scale + ')';
    });
});
