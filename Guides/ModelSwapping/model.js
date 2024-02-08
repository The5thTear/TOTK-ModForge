document.addEventListener('DOMContentLoaded', function() {
    const markdownContainer = document.getElementById('markdown-container');
    const navigationContainer = document.getElementById('navigation-container');
    let scale = 1; // base scale level

    // Function to extract color from the color tag
    function extractColor(text) {
        const colorRegex = /\{#([0-9a-fA-F]{6})\}/;
        const match = text.match(colorRegex);
        return match ? '#' + match[1] : null;
    }

    // Function to replace color tags with span elements
    function processColors(text) {
        return text.replace(/\{#([0-9a-fA-F]{6})\}(.*?)\}/g, (match, color, content) => {
            return `<span style="color: #${color}">${content}</span>`;
        });
    }

    // Fetch and display the markdown content
    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            // Process color tags in the markdown content
            const processedMarkdown = processColors(markdown);
            const htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;

            // Create markers after the markdown content is loaded
            const headers = document.querySelectorAll('#markdown-container h1, #markdown-container h2');
            headers.forEach((header, index) => {
                const marker = document.createElement('div');
                marker.classList.add('marker');

                // Extract color from the text content
                const headerColor = extractColor(header.textContent);

                // Assign the extracted color to the marker
                if (headerColor) {
                    marker.style.backgroundColor = headerColor;
                }

                const headerPosition = (header.offsetTop + header.clientHeight / 2) / markdownContainer.scrollHeight * 100;
                marker.style.top = headerPosition + '%';
                marker.innerHTML = header.innerHTML; // Set the HTML content of the marker

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
