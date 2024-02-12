document.addEventListener('DOMContentLoaded', function () {
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
            return `<span style="color: ${color}">${content}</span>`;
        });
    }

    function createImageSequence(images) {
        const transitionTime = 3000; // Default transition time in milliseconds
        let currentIndex = 0;

        function updateImage() {
            // Create a new container to hold the image
            const imageContainer = document.createElement('div');
            imageContainer.innerHTML = `<img src="${images[currentIndex]}" alt="Image">`;

            // Clear the existing content in markdownContainer
            markdownContainer.innerHTML = '';

            // Append the new image container to markdownContainer
            markdownContainer.appendChild(imageContainer);

            // Delay for transitionTime milliseconds
            setTimeout(() => {
                // Remove the current image container
                markdownContainer.removeChild(imageContainer);

                currentIndex = (currentIndex + 1) % images.length;

                // Continue the image sequence
                updateImage();
            }, transitionTime);
        }

        // Start the image sequence
        updateImage();
    }

    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            // Process color tags in the markdown content
            const processedMarkdown = processColors(markdown);

            // Use a custom delimiter to prevent the Markdown parser from interpreting image sequences
            const customDelimiter = /<!--image-sequence-->([\s\S]*?)<!--\/image-sequence-->/g;
            const customDelimitedMatches = processedMarkdown.match(customDelimiter) || [];

            // Extract image paths into an array
            const imagePaths = customDelimitedMatches.map(match => {
                const imageRegex = /!\[.*?\]\((.*?)\)/;
                const pathMatch = match.match(imageRegex);
                return pathMatch ? pathMatch[1].trim() : null;
            }).filter(path => path !== null);

            // Preprocess the Markdown content by converting HTML comments
            const preprocessedMarkdown = processedMarkdown.replace(/<!--([\s\S]+?)-->/g, '<!-- $1 -->');

            // Use marked to convert the preprocessed Markdown to HTML
            let htmlContent = marked.parse(preprocessedMarkdown);

            // Replace placeholders with actual image sequences
            customDelimitedMatches.forEach((match, index) => {
                htmlContent = htmlContent.replace(`{IMAGE_SEQUENCE_${index}}`, match);
            });

            markdownContainer.innerHTML = htmlContent;

            // Create image sequences after the markdown content is loaded
            if (imagePaths.length > 0) {
                createImageSequence(imagePaths);
            }

            // Create markers after the markdown content is loaded
            const headers = document.querySelectorAll('#markdown-container h1, #markdown-container h2');
            headers.forEach((header, index) => {
                const marker = document.createElement('div');
                marker.classList.add('marker');

                const headerColor = extractColor(header.textContent);

                if (headerColor) {
                    marker.style.backgroundColor = headerColor;
                }

                const headerPosition = (header.offsetTop + header.clientHeight / 2) / markdownContainer.scrollHeight * 100;
                marker.style.top = headerPosition + '%';
                marker.innerHTML = header.innerHTML;

                marker.addEventListener('click', () => {
                    window.scrollTo({ top: header.offsetTop, behavior: 'smooth' });
                });

                navigationContainer.appendChild(marker);
            });
        })
        .catch(error => console.error('Error fetching Markdown:', error));

    // Zoom in button event listener
    document.getElementById('zoom-in').addEventListener('click', function () {
        scale += 0.1;
        markdownContainer.style.transform = `scale(${scale})`;
    });

    // Zoom out button event listener
    document.getElementById('zoom-out').addEventListener('click', function () {
        scale -= 0.1;
        if (scale < 0.1) { scale = 0.1; }
        markdownContainer.style.transform = `scale(${scale})`;
    });
});
