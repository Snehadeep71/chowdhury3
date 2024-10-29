// Select all filter buttons
const filters = document.querySelectorAll('.filter');

// Select all gallery items
const galleryItems = document.querySelectorAll('.gallery .item');

// Add click event listeners to filter buttons
filters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        filters.forEach(btn => btn.classList.remove('active'));

        // Add active class to the clicked filter
        filter.classList.add('active');

        // Get the filter value
        const filterValue = filter.getAttribute('data-filter');

        // Show or hide gallery items based on the filter
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});