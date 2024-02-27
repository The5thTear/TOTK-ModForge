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

        // Create and append image elements to the container
        images.forEach((image, index) => {
            const imageElement = document.createElement('img');
            imageElement.src = image;
            imageElement.style.display = index === 0 ? 'block' : 'none';
            container.appendChild(imageElement);
        });

        // Function to handle image transition
        function transitionImages() {
            const imageElements = container.children;
            imageElements[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            imageElements[currentIndex].style.display = 'block';
        }

        // Set interval for image transition
        setInterval(transitionImages, transitionTime);
    }

    // Fetch and process the markdown content
    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            // Process colors
            let processedMarkdown = processColors(markdown);

            // Handle image sequences
            processedMarkdown = processedMarkdown.replace(/<!--image-sequence time="(\d+(\.\d+)?)s"-->([\s\S]*?)<!--\/image-sequence-->/g, (match, time, _, imagesContent) => {
                const images = imagesContent.match(/\!\[.*?\]\((.*?)\)/g)
                    .map(imgTag => imgTag.match(/\!\[.*?\]\((.*?)\)/)[1]);

                const sequenceContainer = document.createElement('div');
                sequenceContainer.classList.add('image-sequence-container');
                initializeImageSequence(images, parseFloat(time) * 1000, sequenceContainer);

                // Return a placeholder for the sequence container
                return `<div id="seq-${Math.random().toString(36).substr(2, 9)}"></div>`;
            });

            // Convert markdown to HTML
            let htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;

            // Replace placeholders with actual sequence containers
            document.querySelectorAll('[id^="seq-"]').forEach((placeholder, index) => {
                placeholder.replaceWith(document.getElementsByClassName('image-sequence-container')[index]);
            });
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});
