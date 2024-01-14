document.addEventListener('DOMContentLoaded', function() {
    var questionMark = document.getElementById('question-mark');
    var aboutMe = document.getElementById('about-me');

    questionMark.addEventListener('click', function() {
        if (aboutMe.style.display === 'none' || aboutMe.style.display === '') {
            aboutMe.style.display = 'block';
        } else {
            aboutMe.style.display = 'none';
        }
    }); // This closing brace was missing

    // Video hover functionality
    var gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const videoSrc = this.getAttribute('data-video');
            this.innerHTML = `<div class="video-overlay"><video src="${videoSrc}" autoplay loop muted></video></div>`;
        });

        item.addEventListener('mouseleave', function() {
            this.removeChild(this.firstChild);
        });
    });
});
