document.addEventListener('DOMContentLoaded', function () {
    const markdownContainer = document.getElementById('markdown-container');
    const navigationContainer = document.getElementById('navigation-container');
    let scale = 1; // base scale level

    // Override the marked library to interpret HTML comments as raw HTML
    const markedOriginal = marked;
    marked = function (src, opt, callback) {
        if (opt && opt.html) {
            return markedOriginal(src, opt, callback);
        } else {
            return markedOriginal(src.replace(/<!--([\s\S]+?)-->/g, '<!-- $1 -->'), opt, callback);
        }
    };

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

    // Function to create an image sequence
    function createImageSequence(element) {
        const images = element.getAttribute('data-images').split(',');
        const transitionTime = parseInt(element.getAttribute('data-time'), 10);
        let currentIndex = 0;

        function updateImage() {
            markdownContainer.innerHTML = `<img src="${images[currentIndex]}" alt="Image">`;

            currentIndex = (currentIndex + 1) % images.length;

            if (currentIndex === 0) {
                // If it's the last image, remove the current image sequence element from the DOM
                element.parentNode.removeChild(element);
            } else {
                // Continue the image sequence
                setTimeout(updateImage, transitionTime * 1000);
            }
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

            // Replace custom delimited image sequences with a placeholder
            customDelimitedMatches.forEach((match, index) => {
                processedMarkdown = processedMarkdown.replace(match, `{IMAGE_SEQUENCE_${index}}`);
            });

            const htmlContent = marked.parse(processedMarkdown);

            // Replace placeholders with actual image sequences
            customDelimitedMatches.forEach((match, index) => {
                htmlContent = htmlContent.replace(`{IMAGE_SEQUENCE_${index}}`, match);
            });

            markdownContainer.innerHTML = htmlContent;

            // Create image sequences after the markdown content is loaded
            const imageSequences = document.querySelectorAll('.image-sequence');
            imageSequences.forEach(createImageSequence);

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
