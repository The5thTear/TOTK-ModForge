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

    // Function to extract image sequence information
    function processImageSequence(text) {
        return text.replace(/\{\[(.*?)\]: Time="(\d+)"\}\{\.image-sequence\}/g, (match, images, time) => {
            const imageList = images.split(',').map(image => image.trim());
            return `<div class="image-sequence" data-images="${imageList.join(',')}" data-time="${time}"></div>`;
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
            setTimeout(updateImage, transitionTime * 1000);
        }

        updateImage();
    }

    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            // Process image sequences
            const processedMarkdownWithImages = processImageSequence(markdown);
            // Process color tags in the markdown content
            const processedMarkdown = processColors(processedMarkdownWithImages);
            const htmlContent = marked.parse(processedMarkdown);
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
