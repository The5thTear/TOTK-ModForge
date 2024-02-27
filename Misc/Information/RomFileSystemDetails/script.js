document.addEventListener('DOMContentLoaded', function () {
    const markdownContainer = document.getElementById('markdown-container');

    function processColors(text) {
        return text.replace(/\{#([0-9a-fA-F]{6})\}(.*?)}/g, (match, color, content) => {
            return `<span style="color: #${color}">${content}</span>`;
        });
    }

    function initializeImageSequence(images, transitionTime, container) {
        let currentIndex = 0;
        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.style.display = index === 0 ? 'block' : 'none';
            container.appendChild(img);
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

    fetch('romFS-TableOfDetails.md')
        .then(response => response.text())
        .then(markdown => {
            let processedMarkdown = processColors(markdown);

            // Step 1: Replace image sequence markdown with placeholders
            processedMarkdown = processedMarkdown.replace(/<!--image-sequence time="(\d+(\.\d+)?)s"-->([\s\S]*?)<!--\/image-sequence-->/g, (match, time, _, imageMarkdown) => {
                const images = imageMarkdown.match(/!\[.*?\]\((.*?)\)/g).map(m => m.match(/\((.*?)\)/)[1]);
                const placeholderId = `image-sequence-${Math.random().toString(36).substr(2, 9)}`;
                return `<div class="image-sequence-placeholder" id="${placeholderId}" data-images="${images.join(',')}" data-time="${time}"></div>`;
            });

            // Step 2: Convert markdown to HTML
            let htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;

            // Step 3: Replace placeholders with actual image sequences
            document.querySelectorAll('.image-sequence-placeholder').forEach(placeholder => {
                const images = placeholder.getAttribute('data-images').split(',');
                const time = parseFloat(placeholder.getAttribute('data-time')) * 1000;
                const sequenceContainer = document.createElement('div');
                sequenceContainer.classList.add('image-sequence-container');
                initializeImageSequence(images, time, sequenceContainer);
                placeholder.replaceWith(sequenceContainer);
            });
        })
        .catch(error => console.error('Error fetching Markdown:', error));
});