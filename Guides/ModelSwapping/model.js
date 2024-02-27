document.addEventListener('DOMContentLoaded', function () {
    const markdownContainer = document.getElementById('markdown-container');

    // Function to replace color tags with span elements
    function processColors(text) {
        return text.replace(/\{#([0-9a-fA-F]{6})\}(.*?)}/g, (match, color, content) => {
            return `<span style="color: #${color}">${content}</span>`;
        });
    }

    function initializeImageSequence(images, transitionTime, container) {
        let currentIndex = 0;
        images.forEach((image, index) => {
            const imageElement = document.createElement('img');
            imageElement.src = image;
            imageElement.style.display = index === 0 ? 'block' : 'none';
            container.appendChild(imageElement);
        });

        setInterval(() => {
            const imageElements = container.children;
            imageElements[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            imageElements[currentIndex].style.display = 'block';
        }, transitionTime);
    }

    // Fetch and process the markdown content
    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            // Process colors
            let processedMarkdown = processColors(markdown);

            // Handle image sequences
            processedMarkdown = processedMarkdown.replace(/<!--image-sequence time="(\d+)"-->([\s\S]*?)<!--\/image-sequence-->/g, (match, time, imagesContent) => {
                const images = imagesContent.match(/\!\[.*?\]\((.*?)\)/g)
                    .map(imgTag => imgTag.match(/\!\[.*?\]\((.*?)\)/)[1]);

                const sequenceContainer = document.createElement('div');
                sequenceContainer.classList.add('image-sequence-container');
                initializeImageSequence(images, parseInt(time) * 1000, sequenceContainer);

                return sequenceContainer.outerHTML;
            });

            // Convert markdown to HTML
            let htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});
