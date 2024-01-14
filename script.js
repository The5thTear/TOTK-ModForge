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
});
