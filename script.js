document.addEventListener('DOMContentLoaded', function() {
    var gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var url = this.getAttribute('data-url');
            console.log("Clicked on item, URL is:", url); // Log the URL to the console
            if (url) {
                window.location.href = url;
            }
        });
    });

});

document.querySelectorAll('nav ul li').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        document.querySelectorAll('nav ul li').forEach(tab => {
            tab.classList.remove('active');
        });
        this.classList.add('active');
        var activeTab = this.getAttribute('data-tab');
        document.getElementById(activeTab).style.display = 'block';
    });
});

// Initial setup to show the 'news' category
document.querySelectorAll('.entry').forEach(entry => {
    if (entry.getAttribute('data-category') !== 'news') {
        entry.style.display = 'none';
    }
});

// Event listener for tab switching
document.querySelectorAll('nav ul li').forEach(tab => {
    tab.addEventListener('click', function() {
        // Get the category from the clicked tab
        var category = this.textContent.toLowerCase();
        // Hide all entries
        document.querySelectorAll('.entry').forEach(entry => {
            entry.style.display = 'none';
        });
        // Show only entries of the selected category
        document.querySelectorAll(`.entry[data-category="${category}"]`).forEach(entry => {
            entry.style.display = 'block';
        });
        // Update active tab styling
        document.querySelectorAll('nav ul li').forEach(tab => {
            tab.classList.remove('active');
        });
        this.classList.add('active');
    });
});
