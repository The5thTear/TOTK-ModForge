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

    document.addEventListener('DOMContentLoaded', function() {
        var gridItems = document.querySelectorAll('.grid-item');
    
        gridItems.forEach(function(item) {
            item.addEventListener('click', function() {
                var url = this.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            });
        });
    });
});
