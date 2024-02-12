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

    function createImageSequence(images, transitionTime) {
        let currentIndex = 0;

        function updateImage() {
            // Create a new container to hold the image
            const imageContainer = document.createElement('div');
            imageContainer.innerHTML = `<img src="${images[currentIndex]}" alt="Image">`;

            // Clear the existing content in markdownContainer
            markdownContainer.innerHTML = '';

            // Append the new image container to markdownContainer
            markdownContainer.appendChild(imageContainer);

            // Set a timeout for the transition
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage(); // Continue the image sequence
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

            // Extract image sequences and transition times
            const imageSequenceRegex = /<!--image-sequence time="(\d+)"-->([\s\S]*?)<!--\/image-sequence-->/g;
            let match;
            while ((match = imageSequenceRegex.exec(markdown)) !== null) {
                const transitionTime = parseInt(match[1]) * 1000; // Convert seconds to milliseconds
                const images = match[2].match(/!\[.*?\]\((.*?)\)/g)
                    .map(imgTag => imgTag.match(/!\[.*?\]\((.*?)\)/)[1]);

                if (images.length > 0) {
                    createImageSequence(images, transitionTime);
                }
            }

            // Preprocess the Markdown content by converting HTML comments
            const preprocessedMarkdown = processedMarkdown.replace(/<!--([\s\S]+?)-->/g, '<!-- $1 -->');

            // Use marked to convert the preprocessed Markdown to HTML
            let htmlContent = marked.parse(preprocessedMarkdown);

            markdownContainer.innerHTML = htmlContent;

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
