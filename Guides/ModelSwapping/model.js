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

    function createImageSequenceContainer() {
        const imageSequenceContainer = document.createElement('div');
        imageSequenceContainer.classList.add('image-sequence-container');
        return imageSequenceContainer;
    }
    function createImageSequence(images, transitionTime, container) {
        let currentIndex = 0;
    
        // Create and append all image containers initially, but only make the first one visible
        images.forEach((image, index) => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            if (index === 0) { // Only the first container should be visible initially
                imageContainer.classList.add('visible');
            }
            imageContainer.innerHTML = `<img src="${image}" alt="Image">`;
            container.appendChild(imageContainer);
        });
    
        function updateImage() {
            const existingImages = container.querySelectorAll('.image-container');
            existingImages.forEach(img => img.classList.remove('visible')); // Hide all images
            existingImages[currentIndex].classList.add('visible'); // Show current image
    
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length; // Move to the next image
                updateImage(); // Recursive call to continue the sequence
            }, transitionTime);
        }
    
        updateImage();
    }
    
    function processSizeTags(text) {
        // Process individual images only
        return text.replace(/{size}(\d+)%{\/size}(.*?)(\!\[.*?\]\(.*?\))/g, (match, size, preText, imageMarkdown) => {
            return preText + imageMarkdown.replace(/\!\[(.*?)\]\((.*?)\)/, `<img src="$2" alt="$1" style="width: ${size}%; height: auto;">`);
        });
    }
    
    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            let processedMarkdown = processColors(processSizeTags(markdown));
            let htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;
    
            const imageSequenceRegex = /<!--image-sequence time="(\d+)"-->([\s\S]*?)<!--\/image-sequence-->/g;
            let match;
            while ((match = imageSequenceRegex.exec(processedMarkdown)) !== null) {
                const transitionTime = parseInt(match[1]) * 1000;
                const images = match[2].match(/!\[.*?\]\((.*?)\)/g)
                    .map(imgTag => imgTag.match(/!\[.*?\]\((.*?)\)/)[1]);
    
                const container = document.createElement('div');
                container.classList.add('image-sequence-container');
                markdownContainer.appendChild(container);
    
                if (images.length > 0) {
                    createImageSequence(images, transitionTime, container);
                }
            }

            // Create markers after the markdown content is loaded
            const headers = document.querySelectorAll('#markdown-container h1, #markdown-container h2');
            headers.forEach(header => {
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
