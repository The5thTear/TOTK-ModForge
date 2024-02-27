document.addEventListener('DOMContentLoaded', function () {
    const markdownContainer = document.getElementById('markdown-container');

    // Function to replace color tags with span elements
    function processColors(text) {
        return text.replace(/\{#([0-9a-fA-F]{6})\}(.*?)}/g, (match, color, content) => {
            return `<span style="color: #${color}">${content}</span>`;
        });
    }

    function createImageSequenceContainer() {
        const imageSequenceContainer = document.createElement('div');
        imageSequenceContainer.classList.add('image-sequence-container');
        return imageSequenceContainer;
    }

    function initializeImageSequence(images, transitionTime, container) {
        let currentIndex = 0;
        images.forEach((image, index) => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            if (index === 0) {
                imageContainer.classList.add('visible');
            }
            imageContainer.innerHTML = `<img src="${image}" alt="Image">`;
            container.appendChild(imageContainer);
        });

        setInterval(() => {
            const existingImages = container.querySelectorAll('.image-container');
            existingImages.forEach(img => img.classList.remove('visible'));
            existingImages[currentIndex].classList.add('visible');
            currentIndex = (currentIndex + 1) % images.length;
        }, transitionTime);
    }

    // Fetch and process the markdown content
    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            // Process colors
            let processedMarkdown = processColors(markdown);

            // Handle image sequences
            let imageSequenceData = [];
            processedMarkdown = processedMarkdown.replace(/<!--image-sequence time="(\d+)"-->([\s\S]*?)<!--\/image-sequence-->/g, (match, time, imagesContent) => {
                let placeholder = `##image-sequence-placeholder-${imageSequenceData.length}##`;
                imageSequenceData.push({ placeholder, time, imagesContent, sequenceContainer: createImageSequenceContainer() });
                return placeholder;
            });

            // Convert markdown to HTML
            let htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;

            // Replace placeholders and initialize image sequences
            imageSequenceData.forEach(data => {
                const images = data.imagesContent.match(/\!\[.*?\]\((.*?)\)/g)
                    .map(imgTag => imgTag.match(/\!\[.*?\]\((.*?)\)/)[1]);

                if (images.length > 0) {
                    // Replace the placeholder with the image sequence container
                    let placeholderRegex = new RegExp(`##image-sequence-placeholder-${imageSequenceData.indexOf(data)}##`);
                    markdownContainer.innerHTML = markdownContainer.innerHTML.replace(placeholderRegex, data.sequenceContainer.outerHTML);

                    // Initialize the image sequence
                    initializeImageSequence(images, parseInt(data.time) * 1000, data.sequenceContainer);
                }
            });
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});
