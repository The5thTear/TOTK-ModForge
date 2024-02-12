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
        let nextIndex = 1;
    
        function updateImage() {
            // Remove 'visible' class from all image containers
            const existingImages = container.querySelectorAll('.image-container');
            existingImages.forEach(img => img.classList.remove('visible'));
    
            // Add new image container or make the next one visible
            if (existingImages.length < images.length) {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container', 'visible');
                imageContainer.innerHTML = `<img src="${images[currentIndex]}" alt="Image">`;
                container.appendChild(imageContainer);
            } else {
                existingImages[nextIndex].classList.add('visible');
            }
    
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                nextIndex = (currentIndex + 1) % images.length;
                updateImage();
            }, transitionTime);
        }
    
        updateImage();
    }

    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            const processedMarkdown = processColors(markdown);
            let htmlContent = marked.parse(processedMarkdown);

            // Insert placeholders for image sequences
            htmlContent = htmlContent.replace(/<!--image-sequence time="(\d+)"-->([\s\S]*?)<!--\/image-sequence-->/g, () => {
                const container = createImageSequenceContainer();
                return container.outerHTML;
            });

            markdownContainer.innerHTML = htmlContent;

            const imageSequenceRegex = /<!--image-sequence time="(\d+)"-->([\s\S]*?)<!--\/image-sequence-->/g;
            let match, index = 0;
            while ((match = imageSequenceRegex.exec(processedMarkdown)) !== null) {
                const transitionTime = parseInt(match[1]) * 1000;
                const images = match[2].match(/!\[.*?\]\((.*?)\)/g)
                    .map(imgTag => imgTag.match(/!\[.*?\]\((.*?)\)/)[1]);

                const containers = markdownContainer.getElementsByClassName('image-sequence-container');
                if (images.length > 0 && index < containers.length) {
                    createImageSequence(images, transitionTime, containers[index]);
                    index++;
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
