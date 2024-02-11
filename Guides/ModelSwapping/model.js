document.addEventListener('DOMContentLoaded', function() {
    const markdownContainer = document.getElementById('markdown-container');
    const navigationContainer = document.getElementById('navigation-container');
    let scale = 1; // base scale level

    function extractColor(text) {
        const colorRegex = /\{#([0-9a-fA-F]{6})\}/;
        const match = text.match(colorRegex);
        return match ? '#' + match[1] : null;
    }

    function processColors(text) {
        return text.replace(/\{#([0-9a-fA-F]{6})\}(.*?)\}/g, (match, color, content) => {
            return `<span style="color: #${color}">${content}</span>`;
        });
    }

    function createImageSequence(images, transitionTime) {
        let currentIndex = 0;

        function updateImage() {
            const imgElement = document.createElement('img');
            imgElement.src = images[currentIndex];
            imgElement.alt = 'Image';
            markdownContainer.innerHTML = ''; // Clear existing content
            markdownContainer.appendChild(imgElement);
            currentIndex = (currentIndex + 1) % images.length;
            setTimeout(updateImage, transitionTime * 1000);
        }

        updateImage();
    }

    fetch('model-swapping.md')
        .then(response => response.text())
        .then(markdown => {
            const processedMarkdown = processColors(markdown);
            const htmlContent = marked.parse(processedMarkdown);
            markdownContainer.innerHTML = htmlContent;

            const imageSequences = document.querySelectorAll('.image-sequence');
            imageSequences.forEach(sequence => {
                const images = sequence.getAttribute('images').split(',');
                const transitionTime = parseInt(sequence.getAttribute('time'), 10);
                createImageSequence(images, transitionTime);
            });

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

    document.getElementById('zoom-in').addEventListener('click', function() {
        scale += 0.1;
        markdownContainer.style.transform = 'scale(' + scale + ')';
    });

    document.getElementById('zoom-out').addEventListener('click', function() {
        scale -= 0.1;
        if (scale < 0.1) { scale = 0.1; }
        markdownContainer.style.transform = 'scale(' + scale + ')';
    });
});
