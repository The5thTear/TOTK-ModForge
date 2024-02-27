document.addEventListener('DOMContentLoaded', function () {
    const markdownContainer = document.getElementById('markdown-container');

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

        function transitionImages() {
            const imageElements = container.getElementsByTagName('img');
            imageElements[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            imageElements[currentIndex].style.display = 'block';
        }

        if (images.length > 1) {
            setInterval(transitionImages, transitionTime);
        }
    }

    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            let processedMarkdown = processColors(markdown);

            // Replace image sequence markdown with placeholders
            processedMarkdown = processedMarkdown.replace(/<!--image-sequence time="(\d+(\.\d+)?)s"-->([\s\S]*?)<!--\/image-sequence-->/g, (match, time, _, imagesContent) => {
                const placeholderId = `image-sequence-${Math.random().toString(36).substr(2, 9)}`;
                return `<div id="${placeholderId}" data-time="${time}">${imagesContent}</div>`;
            });

            let htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;

            // Find and initialize image sequences
            document.querySelectorAll('div[id^="image-sequence-"]').forEach(container => {
                const time = parseFloat(container.getAttribute('data-time')) * 1000;
                const images = Array.from(container.querySelectorAll('img')).map(img => img.src);

                container.innerHTML = ''; // Clear existing content
                initializeImageSequence(images, time, container);
            });
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});
