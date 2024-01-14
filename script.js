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
