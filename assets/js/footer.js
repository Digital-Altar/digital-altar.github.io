document.addEventListener('DOMContentLoaded', function() {
  // Get current URL path
  var path = window.location.pathname;

  // Select all links in the footer navigation
  var links = document.querySelectorAll('footer .site a');

  // Loop through each link
  links.forEach(function(link) {
    // Check if the link's href matches the current URL path
    if(link.getAttribute('href') === path) {
      // Add 'active' class to the matching link
      link.classList.add('active');
    }
  });
});