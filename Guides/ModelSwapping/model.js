document.addEventListener('DOMContentLoaded', function () {
    const markdownContainer = document.getElementById('markdown-container');

    // Function to replace color tags with span elements
    function processColors(text) {
        // Adjusted regex to match your markdown format
        return text.replace(/\{#([0-9a-fA-F]{6})\}(.*?)}/g, (match, color, content) => {
            return `<span style="color: #${color}">${content}</span>`;
        });
    }

    function createImageSequenceContainer() {
        const imageSequenceContainer = document.createElement('div');
        imageSequenceContainer.classList.add('image-sequence-container');
        return imageSequenceContainer;
    }

    function createImageSequence(images, transitionTime, container) {
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
                imageSequenceData.push({ placeholder, time, imagesContent });
                return placeholder;
            });

            // Convert markdown to HTML
            let htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;

            // Replace placeholders with actual image sequences
            imageSequenceData.forEach((data, index) => {
                let sequenceContainer = createImageSequenceContainer();
                const images = data.imagesContent.match(/\!\[.*?\]\((.*?)\)/g)
                    .map(imgTag => imgTag.match(/\!\[.*?\]\((.*?)\)/)[1]);
                if (images.length > 0) {
                    createImageSequence(images, parseInt(data.time) * 2000, sequenceContainer);
                }

                // Find the placeholder and replace it with the image sequence container
                let placeholderRegex = new RegExp(`##image-sequence-placeholder-${index}##`);
                markdownContainer.innerHTML = markdownContainer.innerHTML.replace(placeholderRegex, sequenceContainer.outerHTML);
            });
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});
